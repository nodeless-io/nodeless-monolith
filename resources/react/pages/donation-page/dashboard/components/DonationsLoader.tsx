import React from "react";
import { Box, Skeleton, Grid } from "@mui/material";

const DonationsLoader = () => {
  return (
    <Box sx={styles.container}>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>

        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>

        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>

        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>

        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>

        <Grid item md={4}>
          <Skeleton
            variant="rounded"
            sx={{ margin: "10px", width: "275px", height: "200px" }}
          />
        </Grid>
      </Grid>
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

export default DonationsLoader;
