import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Divider,
  Switch,
  TableRow,
} from "@mui/material";
import { StoreInvoiceContext } from "../../../../../contexts/store/StoreInvoiceContext";
import StoreInvoicesLoader from "../StoreInvoicesLoader";
import StoreInvoiceTableItem from "./StoreInvoiceTableItem";
import StoreEmptyInvoices from "../StoreEmptyInvoices";
import { PaginationLength } from "../../../../components/constants";

const columns = ["Order ID", "Recipient", "Amount", "Date Created", "Status"];

const StoreInvoiceLargeScreenTable = () => {
  const {
    invoices,
    page,
    setPage,
    isLoading,
    count,
    refetch,
    rowsPerPage,
    showExpired,
    setShowExpired,
  } = React.useContext(StoreInvoiceContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <StoreInvoicesLoader />;

  if (!isLoading && invoices.length === 0) {
    return <StoreEmptyInvoices />;
  }

  return (
    <Box sx={styles.container}>
      <TableContainer sx={styles.tableContainer}>
        <Box sx={styles.header}>
          <Typography sx={styles.headerText}>Recent Invoice</Typography>

          {/* <Box sx={styles.showExpired}>
            <Typography sx={styles.showExpiredText}>Show Expired</Typography>
            <Switch
              size="small"
              color="secondary"
              checked={showExpired}
              onChange={(event) => setShowExpired(event.target.checked)}
            />
          </Box> */}
        </Box>

        <Divider />
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
            {invoices.map((invoice, index) => (
              <StoreInvoiceTableItem key={index} invoice={invoice} />
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
    marginTop: "50px",
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

export default StoreInvoiceLargeScreenTable;
