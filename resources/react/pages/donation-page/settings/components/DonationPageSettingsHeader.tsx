import React from "react";
import { Box, Typography } from "@mui/material";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";
import UpdateDonationPageSettingsModal from "./modals/UpdateDonationPageSettingsModal";

function DonationPageSettingsHeader() {
  const { donationPage } = React.useContext(DonationPageContext);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.headerText}>Donation Page Settings</Typography>

      <UpdateDonationPageSettingsModal donationPage={donationPage} />
    </Box>
  );
}

const styles = {
  container: {
    padding: {
      xs: "10px 20px",
      md: "none",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      sm: "18px",
      lg: "18px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
};

export default DonationPageSettingsHeader;
