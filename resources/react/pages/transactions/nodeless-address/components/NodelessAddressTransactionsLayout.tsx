import React from "react";
import Layout from "../../../components/layouts/Layout";
import { NodelessAddressTransactionsContextProvider } from "../../../../contexts/transactions/NodelessAddressTransactionsContext";
import { TransactionsContextProvider } from "../../../../contexts/transactions/TransactionsContext";
import { Box } from "@mui/material";
import TransactionsNavigationTabs from "../../components/TransactionsNavigationTabs";
import TransactionsHeader from "../../components/TransactionsHeader";

function NodelessAddressTransactionsLayout({ children }) {
  return (
    <Layout>
      <NodelessAddressTransactionsContextProvider>
        <TransactionsContextProvider>
          <Box sx={styles.container}>
            <TransactionsHeader />

            <TransactionsNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </TransactionsContextProvider>
      </NodelessAddressTransactionsContextProvider>
    </Layout>
  );
}

const styles = {
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

export default NodelessAddressTransactionsLayout;
