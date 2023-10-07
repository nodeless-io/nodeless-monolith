import React from "react";
import { Box, Typography } from "@mui/material";
import { SinglePaywallContext } from "../../../../contexts/paywall/SinglePaywallContext";
import UpdatePaywallSettingsModal from "./modals/UpdatePaywallSettingsModal";

function PaywallSettingsHeader() {
  const { paywall } = React.useContext(SinglePaywallContext);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.headerText}>Settings</Typography>

      <UpdatePaywallSettingsModal paywall={paywall} />
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

export default PaywallSettingsHeader;
