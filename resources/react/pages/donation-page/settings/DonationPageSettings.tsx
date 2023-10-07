import React from "react";
import DonationPageLayout from "../components/DonationPageLayout";
import { Box } from "@mui/material";
import { DonationPageIndexContextProvider } from "../../../contexts/donation-page/DonationsPageIndexContext";
import DonationPageSettingsHeader from "./components/DonationPageSettingsHeader";
import DonationPageSettingsContent from "./components/DonationPageSettingsContent";

function DonationPageSettings() {
  return (
    <DonationPageLayout>
      <DonationPageIndexContextProvider>
        <Box>
          <DonationPageSettingsHeader />

          <DonationPageSettingsContent />
        </Box>
      </DonationPageIndexContextProvider>
    </DonationPageLayout>
  );
}

export default DonationPageSettings;
