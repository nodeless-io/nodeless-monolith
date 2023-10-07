import React from "react";
import { Box, Typography } from "@mui/material";
import UpdateWithdrawSettingsModal from "./modals/UpdateWithdrawSettingsModal";

function WithdrawSettingsHeader() {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.headerText}>Withdrawal Settings</Typography>

      <UpdateWithdrawSettingsModal />
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
      xs: "15px",
      md: "20px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
};

export default WithdrawSettingsHeader;
