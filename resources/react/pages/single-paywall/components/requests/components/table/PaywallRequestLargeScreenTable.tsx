import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { SinglePaywallContext } from "../../../../../../contexts/paywall/SinglePaywallContext";
import PaywallRequestLoader from "../PaywallRequestLoader";
import PaywallRequestTableItem from "./PaywallRequestTableItem";
import PaywallEmptyRequests from "../PaywallEmptyRequests";
import { PaginationLength } from "../../../../../components/constants";

const columns = ["ID", "Amount", "Type", "Status", "Date Created"];

const PaywallRequestLargeScreenTable = () => {
  const {
    requests,
    count,
    isLoading,
    page,
    refetch,
    rowsPerPage,
    setPage,
  } = React.useContext(SinglePaywallContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <PaywallRequestLoader />;

  if (!isLoading && requests.length === 0) {
    return <PaywallEmptyRequests />;
  }

  return (
    <Box sx={styles.container}>
      <TableContainer sx={styles.tableContainer}>
        <Table aria-label="sticky table">
          <TableHead sx={styles.tableHead}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={styles.tableHeadText}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.map((request, index) => (
              <PaywallRequestTableItem key={index} request={request} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {count > PaginationLength && (
        <TablePagination
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
  container: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  tableContainer: {
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
  },
  tableHead: {
    background: "#F3F4F6",
  },
  tableHeadText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "20px",
    color: "#374151",
  },
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "20px",
    color: "#6B7280",
  },
};

export default PaywallRequestLargeScreenTable;
