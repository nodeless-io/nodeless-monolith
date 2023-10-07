import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import SinglePaywallLayoutHeader from "./SinglePaywallLayoutHeader";
import SinglePaywallNavigationTabs from "./SinglePaywallNavigationTabs";
import { SinglePaywallContextProvider } from "../../../contexts/paywall/SinglePaywallContext";
import { PaywallContextProvider } from "../../../contexts/paywall/PaywallContext";

const SinglePaywallLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <PaywallContextProvider>
        <SinglePaywallContextProvider>
          <Box sx={styles.container}>
            <SinglePaywallLayoutHeader />

            <SinglePaywallNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </SinglePaywallContextProvider>
      </PaywallContextProvider>
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
    marginTop: "10px",
    padding: {
      xs: 0,
      md: "20px",
    },
  },
};

export default SinglePaywallLayout;
