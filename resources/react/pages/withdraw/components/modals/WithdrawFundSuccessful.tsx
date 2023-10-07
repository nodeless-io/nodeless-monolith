import React from "react";
import { Box, Typography } from "@mui/material";
import SuccessIcon from "../../../assets/svg/checkout-success.svg";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";

const WithdrawFundSuccessful = () => {
  const { withdrawFundsRequest } = React.useContext(WithdrawContext);

  return (
    <Box>
      <Box sx={styles.content}>
        <img src={SuccessIcon} />

        <Typography sx={styles.label}>Transaction Successful</Typography>
      </Box>

      <Box sx={{ background: "#F9FAFB", padding: "40px", marginTop: "30px" }}>
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          Withdrawal ID
        </Typography>

        <Typography
          sx={{
            color: "#9CA3AF",
            fontSize: "14px",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          {withdrawFundsRequest?.withdrawResponse?.uuid}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  content: {
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

export default WithdrawFundSuccessful;
