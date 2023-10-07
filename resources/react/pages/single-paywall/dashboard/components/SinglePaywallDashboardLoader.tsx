import React from "react";
import { Box, Skeleton } from "@mui/material";

const SinglePaywallDashboardLoader = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: "20px",
        },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "10px" }}
        height={300}
      />
    </Box>
  );
};

export default SinglePaywallDashboardLoader;
