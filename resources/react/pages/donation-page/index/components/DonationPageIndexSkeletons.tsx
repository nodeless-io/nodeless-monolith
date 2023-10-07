import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const DonationPageIndexSkeletons = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerInfo}>
          <Box sx={styles.headerIcon}>
            <FilterListIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Donation Pages</Typography>
        </Box>

        <Skeleton
          variant="rectangular"
          width={150}
          height={40}
          sx={{ borderRadius: "20px" }}
        />
      </Box>

      <Box sx={styles.skeletonContainer}>
        <Skeleton
          variant="rectangular"
          width={180}
          height={40}
          sx={{
            borderRadius: "20px",
            display: {
              xs: "none",
              md: "none",
            },
          }}
        />

        <Skeleton variant="text" sx={{ fontSize: "3rem", marginTop: "20px" }} />

        <Skeleton
          variant="rectangular"
          height={260}
          sx={{ marginTop: "20px", borderRadius: "10px" }}
        />

        <Skeleton
          variant="rectangular"
          height={260}
          sx={{
            marginTop: "20px",
            borderRadius: "10px",
            display: {
              xs: "none",
              md: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: "20px",
      md: "20px 40px",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },

  headerIcon: {
    background: "#E1EFFE",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FF5A1F",
    padding: "2px",
    marginRight: "15px",
  },
  headerText: {
    color: "#111928",
    fontSize: "25px",
    fontWeight: "600",
  },

  skeletonContainer: {
    marginTop: "30px",
  },
};

export default DonationPageIndexSkeletons;
