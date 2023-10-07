import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import WithdrawNavigationTabs from "./WithdrawNavigationTabs";
import WithdrawContextProvider from "../../../contexts/withdraw/WithdrawContext";
import WithdrawHeader from "./WithdrawHeader";
import WithdrawFundsModal from "./modals/WithdrawFundModal";

const WithdrawLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <WithdrawContextProvider>
        <Box sx={styles.container}>
          <WithdrawHeader />
          <WithdrawFundsModal />
          <WithdrawNavigationTabs />

          <Box sx={styles.children}>{children}</Box>
        </Box>
      </WithdrawContextProvider>
    </Layout>
  );
};

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

export default WithdrawLayout;
