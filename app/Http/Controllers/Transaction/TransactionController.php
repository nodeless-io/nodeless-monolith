<?php

namespace App\Http\Controllers\Transaction;

use App\Helpers\VerifyOwnership;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\ExportCsvByDateRangeRequest;
use App\Http\Resources\Transaction\TransactionCollection;
use App\Http\Resources\Transaction\TransactionResource;
use App\Repositories\TransactionRepository;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct(
        private TransactionRepository $transactionRepository,
        private TransactionService $transactionService
    ) {
    }

    public function index()
    {
        // grab the query parameter if it exists ?isFee=true
        $isFee = request()->query('isFee');

        // if the query parameter doesnt exist, set it to false
        if ($isFee === null || $isFee === 'false') {
            $isFee = false;
        }

        $transactions = $this->transactionRepository->getTransactionsByUserId(
            userId: auth()->user()->id,
            isFee: $isFee
        );

        return new TransactionCollection($this->paginate($transactions));
    }

    public function show(string $transactionUuid)
    {
        $transaction = $this->transactionRepository->getTransactionByUuid(
            $transactionUuid
        );

        (new VerifyOwnership($transaction, auth()->user()))->verify();

        return new TransactionResource($transaction);
    }

    public function withdrawals()
    {
        $withdrawals = $this->transactionRepository->getWithdrawalTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($withdrawals));
    }

    public function storeInvoices()
    {
        $storeInvoices = $this->transactionRepository->getStoreInvoiceTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($storeInvoices));
    }

    public function donations()
    {
        $donations = $this->transactionRepository->getDonationTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($donations));
    }

    public function gatedMessages()
    {
        $gatedMessages = $this->transactionRepository->getGatedMessageTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($gatedMessages));
    }

    public function referralFees()
    {
        $referralFees = $this->transactionRepository->getReferralFeeTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($referralFees));
    }

    public function paywallRequests()
    {
        $paywallRequests = $this->transactionRepository->getPaywallTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($paywallRequests));
    }

    public function lightningAddressPayments()
    {
        $lightningAddressPayments = $this->transactionRepository->getLightningAddressPaymentTransactionsByUserId(
            auth()->user()->id
        );

        return new TransactionCollection($this->paginate($lightningAddressPayments));
    }

    public function exportCsvByDateRange(ExportCsvByDateRangeRequest $request)
    {
        $startDate = $request->validated('start_date');
        $endDate = $request->validated('end_date');

        return $this->transactionService->exportCsvByDateRange(
            $startDate,
            $endDate
        );
    }
}
