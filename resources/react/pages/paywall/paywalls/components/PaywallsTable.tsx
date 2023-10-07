import React from "react";
import { Box } from "@mui/material";
import { PaywallIndexContext } from "../../../../contexts/paywall/PaywallIndexContext";
import PaywallsLoader from "./PaywallsLoader";
import PaywallEmptyPaywalls from "./PaywallEmptyPaywalls";
import useScreenSize from "../../../../hooks/useScreenSize";
import PaywallLargeScreenTable from "./table/PaywallLargeScreenTable";
import PaywallSmallScreenTable from "./table/PaywallSmallScreenTable";

function PaywallsTable() {
  const {
    isError,
    isLoading,
    paywalls,
    count,
    currentPaywall,
    page,
    refetch,
    rowsPerPage,
    setCurrentPaywall,
    setPage,
  } = React.useContext(PaywallIndexContext);
  const { isSmallScreen } = useScreenSize();

  if (isLoading) return <PaywallsLoader />;

  if (!isLoading && paywalls.length == 0) {
    return <PaywallEmptyPaywalls />;
  }

  if (isSmallScreen) {
    return (
      <Box>
        <PaywallSmallScreenTable />
      </Box>
    );
  } else {
    return (
      <Box>
        <PaywallLargeScreenTable />
      </Box>
    );
  }
}

export default PaywallsTable;
