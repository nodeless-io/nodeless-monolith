import React from "react";
import DonationPageLayout from "../components/DonationPageLayout";
import { Box } from "@mui/material";
import DonationPageCheckoutAppearanceHeader from "./components/DonationPageCheckoutAppearanceHeader";
import DonationPageCheckoutAppearanceContent from "./components/DonationPageCheckoutAppearanceContent";

function DonationPageCheckoutAppearance() {
  return (
    <DonationPageLayout>
      <Box>
        <DonationPageCheckoutAppearanceHeader />
        <DonationPageCheckoutAppearanceContent />
      </Box>
    </DonationPageLayout>
  );
}

export default DonationPageCheckoutAppearance;
