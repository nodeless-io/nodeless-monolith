import React from "react";
import StoreLayout from "../components/StoreLayout";
import { Box } from "@mui/material";
import { StoreIndexContextProvider } from "../../../contexts/store/StoreIndexContext";
import StoreSettingsHeader from "./components/StoreSettingsHeader";
import StoreSettingsContent from "./components/StoreSettingsContent";

function StoreSettings() {
  return (
    <StoreLayout>
      <StoreIndexContextProvider>
        <Box
          sx={{
            padding: {
              md: "20px 40px",
            },
          }}
        >
          <StoreSettingsHeader />

          <StoreSettingsContent />
        </Box>
      </StoreIndexContextProvider>
    </StoreLayout>
  );
}

export default StoreSettings;
