import React from "react";
import CreateNodelessAddressModal from "../components/CreateNodelessAddressModal";
import Layout from "../../components/layouts/Layout";
import { NodelessAddressContextProvider } from "../../../contexts/nodeless-address/NodelessAddressContext";
import { NodelessAddressIndexContextProvider } from "../../../contexts/nodeless-address/NodelessAddressIndexContext";
import Index from "./components/NodelessAddressIndex";

const NodelessAddressIndex = () => {
  return (
    <Layout>
      <NodelessAddressContextProvider>
        <NodelessAddressIndexContextProvider>
          <CreateNodelessAddressModal />
          <Index />
        </NodelessAddressIndexContextProvider>
      </NodelessAddressContextProvider>
    </Layout>
  );
};

export default NodelessAddressIndex;
