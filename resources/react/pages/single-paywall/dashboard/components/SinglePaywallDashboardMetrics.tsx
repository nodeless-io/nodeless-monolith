import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { formatter } from "../../../../utils/Utils";
import useScreenSize from "../../../../hooks/useScreenSize";
import { SinglePaywallContext } from "../../../../contexts/paywall/SinglePaywallContext";

const SinglePaywallDashboardMetrics = () => {
  const { metrics } = React.useContext(SinglePaywallContext);
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

  return (
    <Grid container spacing={spacing()}>
      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Stack direction="row">
            <Typography sx={styles.donationsLabel}>Today</Typography>
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metrics?.today)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>Last 1 day</Typography>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metrics?.last_day)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>Last 7 days</Typography>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metrics?.last_seven_days)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>Last 30 days</Typography>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metrics?.last_thirty_days)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>All Time</Typography>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metrics?.all_time)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  currency: {
    color: "#9CA3AF",
    fontSize: "20px",
    fontWeight: "600",
    marginLeft: "10px",
  },
  increaseText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0E9F6E",
    letterSpacing: "0.02em",
    margin: "0 2px",
  },
  decreaseText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#F05252",
    letterSpacing: "0.02em",
    margin: "0 2px",
  },
  trendIcon: {
    fontSize: "14px",
  },
  card: {
    border: "1px solid #D1D5DB",
    padding: "20px",
    borderRadius: {
      xs: "none",
      md: "10px",
    },
    marginBottom: {
      xs: "20px",
      md: 0,
    },
  },
  donationsLabel: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
    marginRight: "5px",
  },

  donationsLabelSubtext: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginRight: "5px",
  },

  donationsLabelValue: {
    color: "#1F2A37",
    fontSize: "20px",
    fontWeight: "700",
    margin: "10px 0",
  },
  donationsDescription: {
    color: "#0E9F6E",
    fontSize: "13px",
    fontWeight: "600",
    marginRight: "5px",
  },
  donationsDescriptionSubtext: {
    color: "#6B7280",
    fontSize: "13px",
    fontWeight: "600",
    marginRight: "5px",
  },
};

export default SinglePaywallDashboardMetrics;
