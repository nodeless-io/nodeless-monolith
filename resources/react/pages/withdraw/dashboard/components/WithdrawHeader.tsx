import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { UserContext } from "../../../../contexts/user/UserContext";
import { formatter } from "../../../../utils/Utils";

const WithdrawHeader = () => {
  const { user } = React.useContext(UserContext);

  return (
    <Box>
      <Typography sx={styles.header}>Available Balance</Typography>

      <Stack direction="row">
        <Typography sx={styles.amount}>
          {formatter(user?.available_balance)}
        </Typography>
        <Typography sx={styles.currency}>SATS</Typography>
      </Stack>
    </Box>
  );
};

const styles = {
  header: {
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: "12px",
    letterSpacing: "0.04em",
  },
  amount: {
    fontSize: {
      xs: "25px",
      md: "34px",
    },
    color: "#111928",
    fontWeight: "600",
    marginRight: "10px",
    letterSpacing: "0.04em",
  },
  currency: {
    fontSize: {
      xs: "25px",
      md: "34px",
    },
    color: "#6B7280",
    fontWeight: "600",
    letterSpacing: "0.04em",
  },
};

export default WithdrawHeader;
