import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import { DonationPageIndexContextProvider } from "../../../contexts/donation-page/DonationsPageIndexContext";
import { DonationPageContextProvider } from "../../../contexts/donation-page/DonationPageContext";
import DonationPageLayoutHeader from "./DonationPageLayoutHeader";
import DonationPageSelector from "./DonationPageSelector";
import DonationPageNavigationTabs from "./DonationPageNavigationTabs";
import ViewDonationPageDonationModal from "./modals/ViewDonationPageDonationModal";
import CreateDonationPageModal from "./modals/CreateDonationPageModal";

const DonationPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <DonationPageContextProvider>
        <DonationPageIndexContextProvider>
          <Box sx={styles.container}>
            <DonationPageLayoutHeader />

            <ViewDonationPageDonationModal />
            <Box sx={styles.selector}>
              <DonationPageSelector />
            </Box>
            <CreateDonationPageModal />

            <DonationPageNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </DonationPageIndexContextProvider>
      </DonationPageContextProvider>
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
    padding: {
      xs: 0,
      md: "20px",
    },
  },
};

export default DonationPageLayout;
