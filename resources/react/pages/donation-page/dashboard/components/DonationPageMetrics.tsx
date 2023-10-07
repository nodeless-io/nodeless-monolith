import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DonationPageMetricsContext } from "../../../../contexts/donation-page/DonationPageMetricsContext";
import { formatDate, formatter } from "../../../../utils/Utils";
import useScreenSize from "../../../../hooks/useScreenSize";

const DonationPageMetrics = () => {
  const { metricsData } = React.useContext(DonationPageMetricsContext);
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

  const renderTrend = (
    value: string | number,
    type: "increase" | "decrease"
  ) => {
    switch (type) {
      case "decrease":
        return (
          <Stack
            direction="row"
            sx={{ alignItems: "center", marginRight: "7px" }}
          >
            <RemoveIcon color="error" sx={styles.trendIcon} />
            <Typography sx={styles.decreaseText}>{value}</Typography>
            <SouthIcon color="error" sx={styles.trendIcon} />
          </Stack>
        );
      case "increase":
        return (
          <Stack
            direction="row"
            sx={{ alignItems: "center", marginRight: "7px" }}
          >
            <AddIcon color="success" sx={styles.trendIcon} />
            <Typography sx={styles.increaseText}>{value}</Typography>
            <NorthIcon color="success" sx={styles.trendIcon} />
          </Stack>
        );
      default:
        return (
          <Typography
            sx={{ ...styles.donationsDescriptionSubtext, marginRight: "7px" }}
          >
            {value}
          </Typography>
        );
    }
  };

  return (
    <Grid container spacing={spacing()}>
      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Stack direction="row">
            <Typography sx={styles.donationsLabel}>Raised Today</Typography>
            <Typography sx={styles.donationsLabelSubtext}>
              ({formatDate(new Date(), "MMM D")})
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metricsData?.donation_amount_today)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>

          {/* <Stack direction="row">
            <Typography sx={styles.donationsDescription}>3</Typography>
            <Typography sx={styles.donationsDescriptionSubtext}>
              {metricsData?.donation_amount_today}
            </Typography>
          </Stack> */}
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>Total Raised</Typography>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.donationsLabelValue}>
              {formatter(metricsData?.total_donation_amount)}
            </Typography>
            <Typography sx={styles.currency}>SATS</Typography>
          </Stack>

          {/* <Stack direction="row">
            {renderTrend(0.12, "decrease")}
            <Typography sx={styles.donationsDescriptionSubtext}>
              other donations
            </Typography>
          </Stack> */}
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box sx={styles.card}>
          <Typography sx={styles.donationsLabel}>Donors</Typography>

          <Typography sx={styles.donationsLabelValue}>
            {metricsData?.donation_count}
          </Typography>

          {/* <Stack direction="row">
            {renderTrend(0.12, "increase")}
            <Typography sx={styles.donationsDescriptionSubtext}>
              other donations
            </Typography>
          </Stack> */}
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

export default DonationPageMetrics;
