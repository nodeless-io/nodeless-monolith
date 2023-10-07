import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import { PaywallIndexContextProvider } from "../../../contexts/paywall/PaywallIndexContext";
import { PaywallContextProvider } from "../../../contexts/paywall/PaywallContext";
import PaywallLayoutHeader from "./PaywallLayoutHeader";
import PaywallNavigationTabs from "./PaywallNavigationTabs";
import CreatePaywallModal from "./modals/CreatePaywallModal";
import EditPaywallModal from "./modals/EditPaywallModal";

const PaywallLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <PaywallContextProvider>
        <PaywallIndexContextProvider>
          <Box sx={styles.container}>
            <PaywallLayoutHeader />

            <CreatePaywallModal />
            <EditPaywallModal />

            <PaywallNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </PaywallIndexContextProvider>
      </PaywallContextProvider>
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
    padding: "20px",
  },
};

export default PaywallLayout;
