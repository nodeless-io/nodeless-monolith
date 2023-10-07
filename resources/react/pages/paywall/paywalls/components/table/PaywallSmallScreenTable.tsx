import React from "react";
import { Box, TablePagination } from "@mui/material";
import PaywallSmallScreenTableItem from "./PaywallSmallScreenTableItem";
import { PaywallIndexContext } from "../../../../../contexts/paywall/PaywallIndexContext";
import PaywallsLoader from "../PaywallsLoader";
import PaywallEmptyPaywalls from "../PaywallEmptyPaywalls";
import { PaginationLength } from "../../../../components/constants";

const PaywallSmallScreenTable = () => {
  const {
    count,
    isLoading,
    page,
    paywalls,
    refetch,
    rowsPerPage,
    setPage,
  } = React.useContext(PaywallIndexContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <PaywallsLoader />;

  if (!isLoading && paywalls.length === 0) {
    return <PaywallEmptyPaywalls />;
  }

  return (
    <Box sx={styles.table}>
      {paywalls.map((paywall, index) => (
        <PaywallSmallScreenTableItem key={index} paywall={paywall} />
      ))}

      {count > PaginationLength && (
        <TablePagination
          sx={{ marginBottom: "50px" }}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          nextIconButtonProps={{
            style: {
              color: "black",
            },
          }}
        />
      )}
    </Box>
  );
};

const styles = {
  table: {
    width: "100%",
    marginBottom: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  headerText: {
    color: "#1F2A37",
    letterSpacing: "0.04em",
    fontSize: "14px",
    fontWeight: "600",
    lineheight: "20px",
  },
  showExpired: {
    display: "flex",
    alignItems: "center",
  },
  showExpiredText: {
    color: "#6B7280",
    letterSpacing: "0.04em",
    fontSize: "14px",
    fontWeight: "600",
    lineheight: "20px",
    marginRight: "10px",
  },
};

export default PaywallSmallScreenTable;
