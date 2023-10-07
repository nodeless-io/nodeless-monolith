import * as React from "react";
import NodelessAddressTransactionsLayout from "./components/NodelessAddressTransactionsLayout";
import NodelessAddressTransactionsContent from "./components/NodelessAddressTransactionsContent";

const NodelessAddressTransactions = () => {
  return (
    <NodelessAddressTransactionsLayout>
      <NodelessAddressTransactionsContent />
    </NodelessAddressTransactionsLayout>
  );
};

export default NodelessAddressTransactions;
