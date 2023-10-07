import * as React from "react";
import { Skeleton, Stack, Box, Grid } from "@mui/material";

const DonationPageLoader = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", padding: "50px" }}>
      <Skeleton
        variant="rectangular"
        width={250}
        height={40}
        sx={{ marginBottom: "50px", borderRadius: "10px" }}
      />

      <Grid container spacing={5}>
        <Grid item md={6} xs={12}>
          <Skeleton
            variant="rectangular"
            sx={{ width: "90%", height: "275px" }}
          />

          <Skeleton
            variant="rectangular"
            sx={{ width: "90%", height: "300px", marginTop: "30px" }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Skeleton variant="text" width={200} />

          <Skeleton
            variant="rectangular"
            sx={{ width: "90%", height: "125px", marginTop: "30px" }}
          />

          <Skeleton
            variant="rectangular"
            sx={{ width: "90%", height: "125px", marginTop: "30px" }}
          />

          <Skeleton
            variant="rectangular"
            sx={{ width: "90%", height: "125px", marginTop: "30px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DonationPageLoader;
