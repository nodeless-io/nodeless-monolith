import React from "react";
import Layout from "../../../components/layouts/Layout";
import { StoreTransactionsContextProvider } from "../../../../contexts/transactions/StoreTransactionsContext";
import { TransactionsContextProvider } from "../../../../contexts/transactions/TransactionsContext";
import { Box } from "@mui/material";
import TransactionsNavigationTabs from "../../components/TransactionsNavigationTabs";
import TransactionsHeader from "../../components/TransactionsHeader";

function StoreTransactionsLayout({ children }) {
  return (
    <Layout>
      <StoreTransactionsContextProvider>
        <TransactionsContextProvider>
          <Box sx={styles.container}>
            <TransactionsHeader />

            <TransactionsNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </TransactionsContextProvider>
      </StoreTransactionsContextProvider>
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

export default StoreTransactionsLayout;
