import * as React from "react";
import LightningAddressPaymentTransactionsLayout from "./components/LightningAddressPaymentTransactionsLayout";
import LightningAddressTransactionsContent from "./components/LightningAddressTransactionsContent";

const LightningAddressPaymentTransactions = () => {
  return (
    <LightningAddressPaymentTransactionsLayout>
      <LightningAddressTransactionsContent />
    </LightningAddressPaymentTransactionsLayout>
  );
};

export default LightningAddressPaymentTransactions;
