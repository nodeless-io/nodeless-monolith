import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DashboardChart from "./chart/DashboardChart";
import DashboardChartCarousel from "./chart/DashboardChartCarousel";
import DashboardActivity from "./activity/DashboardActivity";

function DashboardContent() {
  return (
    <Box>
      <Box className="chart-container">
        <DashboardChartCarousel />
        <DashboardChart />
      </Box>

      <DashboardActivity />
    </Box>
  );
}

export default DashboardContent;
