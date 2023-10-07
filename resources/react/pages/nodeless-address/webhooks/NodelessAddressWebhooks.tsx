import React from "react";
import NodelessAddressLayout from "../components/NodelessAddressLayout";
import { Box } from "@mui/material";
import NodelessAddressWebhooksTable from "./components/NodelessAddressWebhooksTable";
import CreateNodelessAddressWebhookModal from "./components/modals/CreateNodelessAddressWebhookModal";
import NodelessAddressWebhookHeader from "./components/NodelessAddressWebhookHeader";
import { NodelessAddressWebhooksContextProvider } from "../../../contexts/nodeless-address/NodelessAddressWebhooksContext";

function NodelessAddressWebhooks() {
  return (
    <NodelessAddressLayout>
      <NodelessAddressWebhooksContextProvider>
        <Box sx={styles.container}>
          <CreateNodelessAddressWebhookModal />

          <NodelessAddressWebhookHeader />

          <Box sx={styles.content}>
            <NodelessAddressWebhooksTable />
          </Box>
        </Box>
      </NodelessAddressWebhooksContextProvider>
    </NodelessAddressLayout>
  );
}

const styles = {
  container: {
    padding: "10px 20px",
  },
  infoContainer: {
    marginTop: "20px",
  },
  content: {
    marginTop: "30px",
  },
};

export default NodelessAddressWebhooks;
