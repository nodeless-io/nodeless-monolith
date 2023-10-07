import * as React from "react";
import WithdrawalTransactionsLayout from "./components/WithdrawalTransactionsLayout";
import WithdrawalTransactionsContent from "./components/WithdrawalTransactionsContent";

const WithdrawalTransactions = () => {
  return (
    <WithdrawalTransactionsLayout>
      <WithdrawalTransactionsContent />
    </WithdrawalTransactionsLayout>
  );
};

export default WithdrawalTransactions;
