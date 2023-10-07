import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SuccessIcon from "../../assets/svg/checkout-success.svg";

const DonationPending = () => {
  return (
    <Box sx={styles.container}>
      <img src={SuccessIcon} />

      <Typography sx={styles.label}>Transaction Pending!</Typography>
    </Box>
  );
};

const styles = {
  container: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: "60px",
  },

  label: {
    color: "#374151",
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "18px",
    letterSpacing: "0.04em",
  },
};

export default DonationPending;
