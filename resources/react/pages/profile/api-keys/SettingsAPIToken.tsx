import React from "react";
import SettingsLayout from "../components/SettingsLayout";
import { Box } from "@mui/material";
import SettingsAPITokenContent from "./components/SettingsAPITokenContent";
import GenerateAPITokenModal from "./components/GenerateAPITokenModal";

function SettingsAPIToken() {
  return (
    <SettingsLayout>
      <Box sx={styles.container}>
        <GenerateAPITokenModal />
        <SettingsAPITokenContent />
      </Box>
    </SettingsLayout>
  );
}

const styles = {
  container: {
    padding: {
      xs: "20px",
      md: "30px 30px 40px 30px",
    },
    width: "100%",
    marginTop: {
      xs: "-30px",
      md: "0px",
    },
  },
};

export default SettingsAPIToken;
