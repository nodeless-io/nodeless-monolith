import React from "react";
import { Box, Typography } from "@mui/material";
import { DonationPageIndexContext } from "../../../../contexts/donation-page/DonationsPageIndexContext";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";
import { useParams } from "react-router-dom";
import UpdateDonationPageCheckoutAppearanceModal from "./modals/UpdateDonationPageCheckoutAppearanceModal";

function DonationPageCheckoutAppearanceHeader() {
  const { donationPage: donationPages } = React.useContext(
    DonationPageIndexContext
  );
  const { donationPageId } = useParams();
  const { donationPage } = React.useContext(DonationPageContext);

  const getDonationPageName = () => {
    if (donationPages) {
      const filteredDonationPage = donationPages.find(
        (donationPage) => donationPage.uuid === donationPageId
      );
      return filteredDonationPage?.name;
    }

    return "";
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.headerText}>
        {getDonationPageName()} Settings
      </Typography>

      <UpdateDonationPageCheckoutAppearanceModal donationPage={donationPage} />
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
      md: "20px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
};

export default DonationPageCheckoutAppearanceHeader;
