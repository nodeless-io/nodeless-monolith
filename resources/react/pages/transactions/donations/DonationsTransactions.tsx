import * as React from "react";
import TransactionsLayout from "./components/DonationsTransactionsLayout";
import DonationTransactionsContent from "./components/DonationTransactionsContent";

const DonationsTransactions = () => {
  return (
    <TransactionsLayout>
      <DonationTransactionsContent />
    </TransactionsLayout>
  );
};

export default DonationsTransactions;
