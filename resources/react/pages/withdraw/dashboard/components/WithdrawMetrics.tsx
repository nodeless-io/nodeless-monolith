import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import useScreenSize from "../../../../hooks/useScreenSize";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import { formatter } from "../../../../utils/Utils";

const WithdrawMetrics = () => {
  const {
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  } = useScreenSize();

  const spacing = () => {
    if (
      isSmallScreen &&
      isMediumScreen &&
      isLargeScreen &&
      isExtraLargeScreen
    ) {
      return 0;
    }
    return 4;
  };

  const { withdrawalMetrics } = React.useContext(WithdrawContext);

  return (
    <Box sx={styles.container}>
      <Grid container spacing={spacing()}>
        <Grid item md={4} xs={12}>
          <Box sx={styles.card}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography sx={styles.labelValue}>
                {formatter(withdrawalMetrics?.withdrawals_today)}
              </Typography>
              <Typography sx={styles.currency}>SATS</Typography>
            </Stack>

            <Typography sx={styles.label}>Withdrawals Today</Typography>
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box sx={styles.card}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography sx={styles.labelValue}>
                {formatter(withdrawalMetrics?.withdrawals_last_thirty_days)}
              </Typography>
              <Typography sx={styles.currency}>SATS</Typography>
            </Stack>

            <Typography sx={styles.label}>Withdrawals last 30 days</Typography>
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box sx={styles.card}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography sx={styles.labelValue}>
                {formatter(withdrawalMetrics?.withdrawals_all_time)}
              </Typography>
              <Typography sx={styles.currency}>SATS</Typography>
            </Stack>

            <Typography sx={styles.label}>Withdrawals all time</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    margin: "30px 0",
  },
  card: {
    border: "1px solid #D1D5DB",
    padding: "10px 0 20px 20px",
    borderRadius: {
      xs: "none",
      md: "10px",
    },
  },
  label: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "5px",
  },

  labelSubtext: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginRight: "5px",
  },

  labelValue: {
    color: "#1F2A37",
    fontSize: "20px",
    fontWeight: "700",
    margin: "10px 0",
  },
  currency: {
    color: "#9CA3AF",
    fontSize: "20px",
    fontWeight: "600",
    marginLeft: "10px",
  },
};

export default WithdrawMetrics;
