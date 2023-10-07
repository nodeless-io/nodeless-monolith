import * as React from "react";
import TransactionsLayout from "./components/StoreTransactionsLayout";
import StoreTransactionsContent from "./components/StoreTransactionsContent";

const StoreTransactions = () => {
  return (
    <TransactionsLayout>
      <StoreTransactionsContent />
    </TransactionsLayout>
  );
};

export default StoreTransactions;
