import React from "react";
import { Box, Typography } from "@mui/material";
import SuccessIcon from "../../assets/svg/checkout-success.svg";

const CheckoutSuccess = () => {
  return (
    <Box sx={styles.container}>
      <img src={SuccessIcon} />

      <Typography sx={styles.label}>Transaction Successful</Typography>
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

export default CheckoutSuccess;
