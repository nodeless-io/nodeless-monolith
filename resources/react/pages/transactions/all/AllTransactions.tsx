import * as React from "react";
import TransactionsLayout from "./components/AllTransactionsLayout";
import AllTransactionsContent from "./components/AllTransactionsContent";

const AllTransactions = () => {
  return (
    <TransactionsLayout>
      <AllTransactionsContent />
    </TransactionsLayout>
  );
};

export default AllTransactions;
