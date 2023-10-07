import React from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
} from "@mui/material";
import { currentMonth } from "../../../../utils/helpers";
import StoreEmptyPayments from "./StoreEmptyPayments";
import { StoreInvoiceContext } from "../../../../contexts/store/StoreInvoiceContext";
import StoreInvoicesLoader from "./StoreInvoicesLoader";
import StoreInvoiceTableItem from "./StoreInvoiceTableItem";
import ViewStoreInvoiceModal from "../../invoices/components/modals/ViewStoreInvoiceModal";

const columns = ["Order ID", "Recipient", "Amount", "Date Created", "Status"];

const StoreRecentPayments = () => {
  const { invoices, isLoading } = React.useContext(StoreInvoiceContext);

  if (isLoading) return <StoreInvoicesLoader />;

  if (!isLoading && invoices.length === 0) {
    return <StoreEmptyPayments />;
  }

  return (
    <Box sx={styles.container}>
      <ViewStoreInvoiceModal />
      <Box sx={styles.header}>
        <Box sx={styles.headerText}>
          <Typography sx={styles.label}>Recent Payments</Typography>

          <Divider orientation="vertical" flexItem sx={styles.divider} />

          <Typography sx={styles.month}>{currentMonth}</Typography>
        </Box>
      </Box>
      <Divider sx={styles.headerDivider} />

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
            {invoices.slice(0, 10).map((invoice, index) => (
              <StoreInvoiceTableItem key={index} invoice={invoice} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const styles = {
  tableHeadText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "20px",
    color: "#374151",
  },
  container: {
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "30px",
    marginBottom: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    color: "#374151",
  },
  headerText: {
    display: "flex",
  },
  divider: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  label: {
    color: "#111928",
    letterSpacing: "0.04em",
    fontSize: "16px",
    fontWeight: "600",
  },
  month: {
    color: "#9CA3AF",
    fontSize: "16px",
    fontWeight: "600",
  },
  headerDivider: {
    marginTop: "20px",
  },
  tableContainer: {
    marginTop: "20px",
  },
  tableHeaderCell: {
    color: "#374151",
    fontSize: "15px",
    fontWeight: "600",
  },
  tableBodyCell: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "530",
    letterSpacing: "0.04em",
    lineHeight: "19px",
  },
  tableHead: {
    background: "#F3F4F6",
  },
};

export default StoreRecentPayments;
