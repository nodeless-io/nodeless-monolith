import React from "react";
import useScreenSize from "../../../../../hooks/useScreenSize";
import StoreInvoiceSmallScreenTable from "./StoreInvoiceSmallScreenTable";
import StoreInvoiceLargeScreenTable from "./StoreInvoiceLargeScreenTable";
import ViewStoreInvoiceModal from "../modals/ViewStoreInvoiceModal";
import { Box } from "@mui/material";

const StoreInvoiceTable = () => {
  const { isSmallScreen } = useScreenSize();

  if (isSmallScreen) {
    return (
      <Box>
        <ViewStoreInvoiceModal />
        <StoreInvoiceSmallScreenTable />
      </Box>
    );
  } else {
    return (
      <Box>
        <ViewStoreInvoiceModal />
        <StoreInvoiceLargeScreenTable />
      </Box>
    );
  }
};

export default StoreInvoiceTable;
