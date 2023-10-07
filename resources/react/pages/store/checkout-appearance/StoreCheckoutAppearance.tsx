import React from "react";
import StoreLayout from "../components/StoreLayout";
import { Box } from "@mui/material";
import StoreCheckoutAppearanceHeader from "./components/StoreCheckoutAppearanceHeader";
import StoreCheckoutAppearanceContent from "./components/StoreCheckoutAppearanceContent";

function StoreCheckoutAppearance() {
  return (
    <StoreLayout>
      <Box
        sx={{
          padding: {
            md: "20px 40px",
          },
        }}
      >
        <StoreCheckoutAppearanceHeader />
        <StoreCheckoutAppearanceContent />
      </Box>
    </StoreLayout>
  );
}

export default StoreCheckoutAppearance;
