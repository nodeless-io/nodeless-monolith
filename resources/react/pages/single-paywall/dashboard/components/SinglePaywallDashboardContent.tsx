import React from "react";
import { Box, Typography } from "@mui/material";
import { SinglePaywallContext } from "../../../../contexts/paywall/SinglePaywallContext";
import SinglePaywallDashboardLoader from "./SinglePaywallDashboardLoader";
import SinglePaywallRequests from "../../components/requests/SinglePaywallRequests";
import SinglePaywallDashboardMetrics from "./SinglePaywallDashboardMetrics";

const SinglePaywallDashboardContent = () => {
  const { isLoading, paywall } = React.useContext(SinglePaywallContext);

  return isLoading ? (
    <SinglePaywallDashboardLoader />
  ) : (
    <Box sx={{ padding: "10px 20px" }}>
      <Typography sx={styles.name}>{paywall?.name}</Typography>
      <SinglePaywallDashboardMetrics />

      <SinglePaywallRequests />
    </Box>
  );
};

const styles = {
  name: {
    color: "#111928",
    fontSize: {
      xs: "18px",
      md: "20px",
    },
    fontWeight: "600",
    letterSpacing: "0.02em",
    marginBottom: "25px",
    marginLeft: "10px",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  gridItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10px",
  },
  value: {
    color: "#374151",
    fontWeight: "600",
    letterSpacing: "0.02em",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    marginBottom: "10px",
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "600",
    letterSpacing: "0.02em",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
  },
  card: {
    border: "1px solid #D1D5DB",
    padding: "20px",
    borderRadius: {
      xs: "none",
      md: "10px",
    },
    width: "100%",
  },
};

export default SinglePaywallDashboardContent;
