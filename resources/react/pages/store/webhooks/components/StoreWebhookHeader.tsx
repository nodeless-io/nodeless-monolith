import React from "react";
import { Box, Typography } from "@mui/material";
import { SecondaryOutlinedButton } from "../../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import { StoreContext } from "../../../../contexts/store/StoreContext";

function StoreWebhookHeader() {
  const { setCreateStoreWebhookModalOpen } = React.useContext(StoreContext);

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.headerText}>Webhooks</Typography>

      <SecondaryOutlinedButton
        text="New Webhook"
        styles={styles.newWebhookButton}
        startIcon={<AddIcon />}
        onClick={() => setCreateStoreWebhookModalOpen(true)}
      />
    </Box>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "18px",
      md: "20px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
  newWebhookButton: {
    width: "175px",
    borderRadius: "24px",
    height: "38px",
  },
};

export default StoreWebhookHeader;
