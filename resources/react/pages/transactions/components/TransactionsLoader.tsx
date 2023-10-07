import React from "react";
import { Box, Skeleton } from "@mui/material";

const TransactionsLoader = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: "20px",
        },
        marginTop: {
          xs: "20px",
          md: "50px",
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

export default TransactionsLoader;
