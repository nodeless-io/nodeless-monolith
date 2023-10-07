import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import PaywallRequestTable from "./components/PaywallRequestTable";
import ViewPaywallRequestModal from "./components/ViewPaywallRequestModal";

function SinglePaywallRequests() {
  return (
    <Box sx={{ marginTop: "10px", padding: "10px" }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          width: "100%",
          borderBottom: "1px solid #E5E7EB",
          alignItems: "center",
          padding: "10px 20px",
          marginTop: {
            xs: "0px",
            md: "20px",
          },
          marginBottom: "20px",
        }}
      >
        <Typography sx={styles.headerText}>Requests</Typography>
      </Stack>
      <ViewPaywallRequestModal />

      <PaywallRequestTable />
    </Box>
  );
}

const styles = {
  headerText: {
    color: "#1F2A37",
    fontSize: "14px",
    letterSpacing: "0.04em",
    fontWeight: "600",
  },
};

export default SinglePaywallRequests;
