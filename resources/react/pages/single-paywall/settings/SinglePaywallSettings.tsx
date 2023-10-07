import React from "react";
import SinglePaywallLayout from "../components/SinglePaywallLayout";
import { Box } from "@mui/material";
import PaywallSettingsHeader from "./components/PaywallSettingsHeader";
import PaywallSettingsContent from "./components/PaywallSettingsContent";

function SinglePaywallSettings() {
  return (
    <SinglePaywallLayout>
      <Box>
        <PaywallSettingsHeader />

        <PaywallSettingsContent />
      </Box>
    </SinglePaywallLayout>
  );
}

export default SinglePaywallSettings;
