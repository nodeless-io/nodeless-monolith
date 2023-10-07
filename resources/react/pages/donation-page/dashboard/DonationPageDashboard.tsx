import React from "react";
import { Box, Divider } from "@mui/material";
import DonationPageLayout from "../components/DonationPageLayout";
import DonationPageImage from "./components/DonationPageImage";
import DonationPageDetails from "./components/DonationPageDetails";
import DonationPageMetrics from "./components/DonationPageMetrics";
import DonationPageRecentDonations from "./components/DonationPageRecentDonations";
import { DonationPageMetricsContextProvider } from "../../../contexts/donation-page/DonationPageMetricsContext";
import "./styles.css";

const DonationPageDashboard = () => {
  return (
    <DonationPageLayout>
      <DonationPageMetricsContextProvider>
        <Box sx={styles.container}>
          <Box className='donation-page-details'>
            <DonationPageImage />
            <DonationPageDetails />
          </Box>

          <Divider
            sx={{
              margin: "50px 0",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          />

          <DonationPageMetrics />

          <DonationPageRecentDonations />
        </Box>
      </DonationPageMetricsContextProvider>
    </DonationPageLayout>
  );
};

const styles = {
  container: {
    margin: "0px 0px 40px 0px",
    padding: {
      sm: "0 25px",
      md: "unset",
    },
  },
};

export default DonationPageDashboard;
