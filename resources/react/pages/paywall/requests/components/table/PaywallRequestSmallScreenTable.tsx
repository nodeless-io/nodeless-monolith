import React from "react";
import { Box, TablePagination } from "@mui/material";
import PaywallRequestSmallScreenTableItem from "./PaywallRequestSmallScreenTableItem";
import PaywallRequestLoader from "../PaywallRequestLoader";
import PaywallEmptyRequests from "../PaywallEmptyRequests";
import { PaginationLength } from "../../../../components/constants";
import { PaywallRequestContext } from "../../../../../contexts/paywall/PaywallRequestsContext";

const PaywallRequestSmallScreenTable = () => {
  const {
    requests,
    count,
    isLoading,
    page,
    refetch,
    rowsPerPage,
    setPage,
  } = React.useContext(PaywallRequestContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <PaywallRequestLoader />;

  if (!isLoading && requests.length === 0) {
    return <PaywallEmptyRequests />;
  }

  return (
    <Box sx={styles.table}>
      {requests.map((request, index) => (
        <PaywallRequestSmallScreenTableItem key={index} request={request} />
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
    lineHeight: "20px",
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
    lineHeight: "20px",
    marginRight: "10px",
  },
};

export default PaywallRequestSmallScreenTable;
