import React from "react";
import Layout from "../../components/layouts/Layout";
import { StoreContextProvider } from "../../../contexts/store/StoreContext";
import { StoreIndexContextProvider } from "../../../contexts/store/StoreIndexContext";
import Index from "./components/Index";
import CreateStoreModal from "../components/CreateStoreModal";

const StoreIndex = () => {
  return (
    <Layout>
      <StoreContextProvider>
        <StoreIndexContextProvider>
          <Index />
          <CreateStoreModal />
        </StoreIndexContextProvider>
      </StoreContextProvider>
    </Layout>
  );
};

export default StoreIndex;
