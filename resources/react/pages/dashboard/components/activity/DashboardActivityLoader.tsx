import React from "react";
import { Box, Skeleton } from "@mui/material";

const DashboardActivityLoader = () => {
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "10px", width: "100%" }}
        height={300}
      />
    </Box>
  );
};

export default DashboardActivityLoader;
