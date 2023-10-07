import React from "react";
import { Skeleton, Box } from "@mui/material";

const GatedInboxRequestLoader = () => {
  return (
    <Box sx={styles.container}>
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", width: "200px", margin: "auto" }}
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", width: "500px", margin: "20px auto" }}
      />

      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", margin: "50px auto", height: "50px" }}
      />
      <Skeleton
        variant="rounded"
        sx={{ margin: "50px auto", width: "350px", height: "250px" }}
      />

      <Skeleton
        variant="rounded"
        sx={{ margin: "50px auto" }}
        width={210}
        height={60}
      />

      <Skeleton
        variant="rounded"
        sx={{ margin: "50px auto" }}
        width={210}
        height={60}
      />
    </Box>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: "60px 30px",
    textAlign: "center",
    justifyContent: "center",
  },
};

export default GatedInboxRequestLoader;
