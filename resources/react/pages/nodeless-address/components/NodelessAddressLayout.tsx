import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import NodelessAddressNavigationTabs from "./NodelessAddressNavigationTabs";
import { NodelessAddressContextProvider } from "../../../contexts/nodeless-address/NodelessAddressContext";
import { NodelessAddressIndexContextProvider } from "../../../contexts/nodeless-address/NodelessAddressIndexContext";
import NodelessAddressSelector from "./NodelessAddressSelector";
import NodelessAddressLayoutHeader from "./NodelessAddressLayoutHeader";
import CreateNodelessAddressModal from "./CreateNodelessAddressModal";

const NodelessAddressLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <NodelessAddressContextProvider>
        <NodelessAddressIndexContextProvider>
          <Box sx={styles.container}>
            <NodelessAddressLayoutHeader />
            <CreateNodelessAddressModal />

            <Box sx={styles.selector}>
              <NodelessAddressSelector />
            </Box>

            <NodelessAddressNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </NodelessAddressIndexContextProvider>
      </NodelessAddressContextProvider>
    </Layout>
  );
};

const styles = {
  selector: {
    display: {
      md: "block",
      xs: "none",
    },
  },
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: 0,
      sm: "10px",
      md: "0 20px",
    },
  },
  children: {
    marginTop: "30px",
  },
};

export default NodelessAddressLayout;
