import React from "react";
import NodelessAddressLayout from "../components/NodelessAddressLayout";
import { Box } from "@mui/material";
import NodelessAddressRecentMessages from "./components/NodelessAddressRecentMessages";
import { NodelessAddressMetricsContextProvider } from "../../../contexts/nodeless-address/NodelessAddressMetricsContext";
import { NodelessAddressMessageContextProvider } from "../../../contexts/nodeless-address/NodelessAddressMessageContext";
import NodelessAddressMetrics from "./components/NodelessAddressMetrics";

const NodelessAddressDashboard = () => {
  return (
    <NodelessAddressLayout>
      <Box>
        <NodelessAddressMetricsContextProvider>
          <NodelessAddressMetrics />
        </NodelessAddressMetricsContextProvider>

        <NodelessAddressMessageContextProvider>
          <NodelessAddressRecentMessages />
        </NodelessAddressMessageContextProvider>
      </Box>
    </NodelessAddressLayout>
  );
};

export default NodelessAddressDashboard;
