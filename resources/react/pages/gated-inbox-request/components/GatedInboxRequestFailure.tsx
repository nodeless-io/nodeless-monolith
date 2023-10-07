import React from "react";
import { Box, Typography } from "@mui/material";
import FailureIcon from "../../assets/svg/checkout-fail.svg";

const GatedInboxRequestFailure = () => {
  return (
    <Box sx={styles.container}>
      <img src={FailureIcon} />

      <Typography sx={styles.label}>Transaction Failed</Typography>
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

export default GatedInboxRequestFailure;
