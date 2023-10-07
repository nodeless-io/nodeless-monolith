import React from "react";
import StoreLayout from "../components/StoreLayout";
import { Box } from "@mui/material";
import StoreInvoiceTable from "./components/table/StoreInvoiceTable";
import { StoreInvoiceContextProvider } from "../../../contexts/store/StoreInvoiceContext";
import CreateStoreInvoiceModal from "./components/modals/CreateStoreInvoiceModal";
import StoreInvoiceHeader from "./components/StoreInvoiceHeader";

function StoreInvoice() {
  return (
    <StoreLayout>
      <StoreInvoiceContextProvider>
        <Box
          sx={{
            padding: {
              md: "20px 40px",
            },
          }}
        >
          <CreateStoreInvoiceModal />
          <StoreInvoiceHeader />

          <StoreInvoiceTable />
        </Box>
      </StoreInvoiceContextProvider>
    </StoreLayout>
  );
}

export default StoreInvoice;
