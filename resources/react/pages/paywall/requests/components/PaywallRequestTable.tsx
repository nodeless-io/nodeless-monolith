import React from "react";
import { Box } from "@mui/material";
import useScreenSize from "../../../../hooks/useScreenSize";
import PaywallRequestSmallScreenTable from "./table/PaywallRequestSmallScreenTable";
import PaywallRequestLargeScreenTable from "./table/PaywallRequestLargeScreenTable";

const PaywallRequestTable = () => {
  const { isSmallScreen } = useScreenSize();

  if (isSmallScreen) {
    return (
      <Box>
        <PaywallRequestSmallScreenTable />
      </Box>
    );
  } else {
    return (
      <Box>
        <PaywallRequestLargeScreenTable />
      </Box>
    );
  }
};

export default PaywallRequestTable;
