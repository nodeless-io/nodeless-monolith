import * as React from "react";
import TransactionsLayout from "./components/PaywallRequestTransactionsLayout";
import PaywallRequestTransactionsContent from "./components/PaywallRequestTransactionsContent";

const PaywallRequestTransactions = () => {
  return (
    <TransactionsLayout>
      <PaywallRequestTransactionsContent />
    </TransactionsLayout>
  );
};

export default PaywallRequestTransactions;
