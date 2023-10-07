import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyTransactions = () => {
  return (
    <Box sx={styles.content}>
      <Box sx={{ justifyContent: "center" }}>
        <Typography sx={styles.label}>No transactions made yet</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginTop: "100px",
    marginBottom: "150px",
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

export default EmptyTransactions;
