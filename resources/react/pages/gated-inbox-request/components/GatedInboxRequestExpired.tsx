import React from "react";
import { Box, Typography } from "@mui/material";
import ExpiredIcon from "../../assets/svg/checkout-expired.svg";

const GatedInboxRequestExpired = () => {
  return (
    <Box sx={styles.container}>
      <img src={ExpiredIcon} />

      <Typography sx={styles.label}>Transaction Expired</Typography>
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

export default GatedInboxRequestExpired;
