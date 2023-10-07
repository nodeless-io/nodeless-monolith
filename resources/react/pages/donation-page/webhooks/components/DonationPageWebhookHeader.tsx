import React from "react";
import { Box, Typography } from "@mui/material";
import { SecondaryOutlinedButton } from "../../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";

function DonationPageWebhookHeader() {
  const { setCreateDonationPageWebhooksModalOpen } = React.useContext(
    DonationPageContext
  );

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.headerText}>Webhooks</Typography>

      <SecondaryOutlinedButton
        text="New Webhook"
        styles={styles.newWebhookButton}
        startIcon={<AddIcon />}
        onClick={() => setCreateDonationPageWebhooksModalOpen(true)}
      />
    </Box>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
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
  newWebhookButton: {
    width: "175px",
    borderRadius: "24px",
    height: "38px",
    border: {
      xs: "1px solid white",
      md: "1px solid #FF5A1F",
    },
    fontSize: {
      xs: "14px",
      md: "16px",
    },
  },
};

export default DonationPageWebhookHeader;
