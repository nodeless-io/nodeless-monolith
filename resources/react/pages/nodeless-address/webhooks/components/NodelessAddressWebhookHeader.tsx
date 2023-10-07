import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { SecondaryOutlinedButton } from "../../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import { NodelessAddressContext } from "../../../../contexts/nodeless-address/NodelessAddressContext";

function NodelessAddressWebhookHeader() {
  const { setCreateNodelessAddressWebhooksModalOpen } = React.useContext(
    NodelessAddressContext
  );

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.headerText}>Webhooks</Typography>

      <SecondaryOutlinedButton
        text="New Webhook"
        styles={styles.newWebhookButton}
        startIcon={<AddIcon />}
        onClick={() => setCreateNodelessAddressWebhooksModalOpen(true)}
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
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "100%",
  },
  newWebhookButton: {
    width: "175px",
    borderRadius: "24px",
    height: "38px",
  },
};

export default NodelessAddressWebhookHeader;
