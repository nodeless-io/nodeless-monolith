import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NodelessAddressEmptyMessages = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={{ justifyContent: "center" }}>
          <SearchIcon sx={styles.icon} />

          <Typography sx={styles.label}>No Messages</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  icon: {
    background: "#F3F4F6",
    borderRadius: "50%",
    height: "68px",
    width: "68px",
    padding: "20px",
    color: "#374151",
    marginBottom: "30px",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: "0 20px",
      md: "unset",
    },
    marginBottom: "50px",
  },

  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // width: "100%",
    marginTop: "100px",
  },

  label: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "700",
    marginTop: "30x",
    marginBottom: "20px",
  },
};

export default NodelessAddressEmptyMessages;
