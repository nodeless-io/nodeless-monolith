import React from "react";
import WithdrawLayout from "../components/WithdrawLayout";
import { Box } from "@mui/material";
import WithdrawSettingsHeader from "./components/WithdrawSettingsHeader";
import WithdrawSettingsContent from "./components/WithdrawSettingsContent";

function WithdrawSettings() {
  return (
    <WithdrawLayout>
      <Box>
        <WithdrawSettingsHeader />

        <WithdrawSettingsContent />
      </Box>
    </WithdrawLayout>
  );
}

export default WithdrawSettings;
