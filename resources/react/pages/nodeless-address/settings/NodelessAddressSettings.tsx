import React from "react";
import NodelessAddressLayout from "../components/NodelessAddressLayout";
import { Box, Typography } from "@mui/material";
import NodelessAddressSettingsContent from "./components/NodelessAddressSettingsContent";
import UpdateStoreSettingsModal from "./components/modals/UpdateEmailSettingsModal";

const NodelessAddressSettings = () => {
  return (
    <NodelessAddressLayout>
      <Box sx={styles.container}>
        <Typography sx={styles.headerText}>Address Settings</Typography>
        <UpdateStoreSettingsModal />
      </Box>

      <NodelessAddressSettingsContent />
    </NodelessAddressLayout>
  );
};

const styles = {
  container: {
    padding: {
      xs: "10px 20px",
      md: "none",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "20px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
};

export default NodelessAddressSettings;
