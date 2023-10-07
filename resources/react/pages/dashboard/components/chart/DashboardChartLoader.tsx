import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const DashboardChartLoader = () => {
  return (
    <Box>
      <Typography sx={styles.header}>Balance</Typography>

      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", marginTop: "20px", width: "100px" }}
      />

      <Skeleton
        variant="rectangular"
        sx={{ marginTop: "20px", width: "100%", height: "100px" }}
      />

      <Skeleton
        variant="rectangular"
        sx={{ marginTop: "20px", width: "100%", height: "100px" }}
      />
    </Box>
  );
};

const styles = {
  header: {
    color: "#374151",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "5px",
  },
};
export default DashboardChartLoader;
