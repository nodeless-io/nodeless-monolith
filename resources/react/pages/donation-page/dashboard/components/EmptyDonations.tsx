import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyDonations = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={{ justifyContent: "center" }}>
          <Typography sx={styles.label}>No Donations made yet</Typography>

          <Typography sx={styles.description}>
            There has been no donations made yet.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: "0 20px",
      md: "unset",
    },
    marginBottom: {
      xs: "150px",
      md: "20px",
    },
  },

  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginTop: {
      xs: "60px",
      md: "100px",
    },
    marginBottom: {
      xs: "50px",
      md: "none",
    },
  },
  icon: {
    background: "#F3F4F6",
    borderRadius: "50%",
    height: "68px",
    width: "68px",
    padding: "20px",
    color: "#374151",
    marginBottom: "30px",
  },
  label: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "700",
    marginTop: "30x",
    marginBottom: "20px",
  },
  description: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "150%",
    letterSpacing: "0.01em",
    fontWeight: "600",
  },
};

export default EmptyDonations;
