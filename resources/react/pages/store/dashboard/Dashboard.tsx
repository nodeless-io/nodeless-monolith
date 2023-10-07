import React from "react";
import StoreLayout from "../components/StoreLayout";
import { Box } from "@mui/material";
import StoreSalesGraph from "./components/StoreSalesGraph";
import StoreRecentPayments from "./components/StoreRecentPayments";
import { StoreMetricsContextProvider } from "../../../contexts/store/StoreMetricsContext";
import { StoreInvoiceContextProvider } from "../../../contexts/store/StoreInvoiceContext";

function Dashboard() {
  return (
    <StoreLayout>
      <Box
        sx={{
          padding: {
            md: "20px 40px",
          },
        }}
      >
        <StoreMetricsContextProvider>
          <StoreSalesGraph />
        </StoreMetricsContextProvider>

        <StoreInvoiceContextProvider>
          <StoreRecentPayments />
        </StoreInvoiceContextProvider>
      </Box>
    </StoreLayout>
  );
}

export default Dashboard;
