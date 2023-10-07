import React from "react";
import SettingsLayout from "../components/SettingsLayout";
import TwoFactorSettingsContent from "./components/TwoFactorSettingsContent";

function TwoFactorSettings() {
  return (
    <SettingsLayout>
      <TwoFactorSettingsContent />
    </SettingsLayout>
  );
}

export default TwoFactorSettings;
