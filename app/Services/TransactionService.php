<?php

namespace App\Services;

use App\Enums\TransactionType;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\TransactionRepository;
use Illuminate\Support\Facades\Log;

class TransactionService
{
    public function __construct(private TransactionRepository $transactionRepository)
    {
    }

    public function exportCsvByDateRange(string $startDate, string $endDate)
    {
        $transactions = $this
                            ->transactionRepository
                            ->getTransactionsByUserIdAndDateRange(
                                userId: auth()->user()->id,
                                startDate: $startDate,
                                endDate: $endDate,
                                isFee: true
                            );

        $csv = "Date,Transaction ID,Transaction Type,Module Type,Amount,Status,Is Fee,On-Chain TX,Lightning Preimage,Lightning Payment Hash\n";

        foreach ($transactions as $transaction) {
            $moduleType = str_replace('App\\Models\\', '', $transaction->transactable_type);
            $isFee = $transaction->is_fee ? 'true' : 'false';
            $csv .= "{$transaction->created_at},{$transaction->uuid},{$transaction->type},{$moduleType},{$transaction->amount},{$transaction->status},{$isFee},{$transaction->onchain_tx},{$transaction->lightning_payment_preimage},{$transaction->lightning_payment_hash}\n";
        }

        $filename = 'transactions.csv';

        // Set the appropriate headers for CSV file download
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        // Open a stream and write the CSV data
        $stream = fopen('php://output', 'w');
        fwrite($stream, $csv);
        fclose($stream);

        // Prevent any further output
        exit;
    }

    public function purgeDuplicates(User $user): bool {
        $credit = $this->catchDuplicateTransactions($user, TransactionType::CREDIT);
        $debit = $this->catchDuplicateTransactions($user, TransactionType::DEBIT);

        if ($credit || $debit) {
            return true;
        }

        return false;
    }

    private function catchDuplicateTransactions(User $user, TransactionType $transactionType): bool {

        $latestTransactions = Transaction::where('user_id', $user->id)
            ->where('type', $transactionType->value)
            ->where('deleted_at', null)
            ->where('transactable_type', '!=', 'App\Models\Withdrawal')
            ->latest()
            ->take(10)
            ->get();

        $bitcoinables = [];
        $latestTransactions->each(function ($transaction) use (&$bitcoinables) {
            $bitcoinables[] = $transaction->transactable;
        });

        $checkedBitcoinables = collect($bitcoinables)->filter(function ($bitcoinable) use ($transactionType) {
            return $bitcoinable->transaction()->where('type', $transactionType->value)->count() > 1;
        });

        if ($checkedBitcoinables->count() === 0) {
            Log::notice('No duplicate transactions found for user ' . $user->id);
            return false;
        }

        Log::notice('Found ' . $checkedBitcoinables->count() . ' duplicate transactions for user ' . $user->id . ' of type ' . $transactionType->value);

        // we have all the duplicates, now we have to find how many unique bitcoinables are here
        $uniqueBitcoinables = collect($checkedBitcoinables)->unique('uuid');

        Log::notice('Found ' . $checkedBitcoinables->count() . ' unique bitcoinables for user ' . $user->id . ' of type ' . $transactionType->value);

        // for each bitcoinable, we need to find the latest transaction, and delete all the others
        $uniqueBitcoinables->each(function ($bitcoinable) use ($transactionType) {
            $keepTxn = $bitcoinable->transaction()->where('type', $transactionType->value)->latest()->first();
            
            $deleteTxns = $bitcoinable->transaction()->where('type', $transactionType->value)->where('id', '!=', $keepTxn->id)->get();
            $countDelete = $deleteTxns->count();

            Log::notice('Found ' . $countDelete . ' duplicate transactions for bitcoinable ' . $bitcoinable->id . ' of type ' . $transactionType->value);

            $deleteTxns->each(function ($deleteTxn) {
                Log::notice('Deleting transaction ' . $deleteTxn->id . ' of type ' . $deleteTxn->type . ' for bitcoinable ' . $deleteTxn->transactable_id);
                $deleteTxn->delete();
            });
        });

        return true;
    }
}
