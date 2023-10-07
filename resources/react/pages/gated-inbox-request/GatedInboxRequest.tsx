import React from "react";
import GatedInboxRequestContent from "./components/GatedInboxRequestContent";
import { NodelessAddressMessageRequestContextProvider } from "../../contexts/nodeless-address/NodelessAddressMessageRequestContext";

const GatedInboxRequest = () => {
  return (
    <NodelessAddressMessageRequestContextProvider>
      <GatedInboxRequestContent />
    </NodelessAddressMessageRequestContextProvider>
  );
};

export default GatedInboxRequest;
