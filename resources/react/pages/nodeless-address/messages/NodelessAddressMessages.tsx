import React from "react";
import NodelessAddressLayout from "../components/NodelessAddressLayout";
import { Box } from "@mui/material";
import NodelessAddressSearchBar from "./components/NodelessAddressSearchBar";
import NodelessAddressMessagesTable from "./components/NodelessAddressMessagesTable";
import { NodelessAddressMessageContextProvider } from "../../../contexts/nodeless-address/NodelessAddressMessageContext";
import ViewMessageModal from "./components/ViewMessageModal";

const NodelessAddressMessages = () => {
  return (
    <NodelessAddressLayout>
      <NodelessAddressMessageContextProvider>
        <Box>
          {/* <NodelessAddressSearchBar /> */}
          <NodelessAddressMessagesTable />
          <ViewMessageModal />
        </Box>
      </NodelessAddressMessageContextProvider>
    </NodelessAddressLayout>
  );
};

export default NodelessAddressMessages;
