import React from "react";
import {
  Box,
  Typography,
  Divider,
  Switch,
  TablePagination,
} from "@mui/material";
import StoreInvoiceSmallScreenTableItem from "./StoreInvoiceSmallScreenTableItem";
import { StoreInvoiceContext } from "../../../../../contexts/store/StoreInvoiceContext";
import StoreInvoicesLoader from "../StoreInvoicesLoader";
import StoreEmptyInvoices from "../StoreEmptyInvoices";
import { PaginationLength } from "../../../../components/constants";

const StoreInvoiceSmallScreenTable = () => {
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
      <Divider />

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

      <Box sx={styles.table}>
        {invoices.map((invoice, index) => (
          <StoreInvoiceSmallScreenTableItem key={index} invoice={invoice} />
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
    </Box>
  );
};

const styles = {
  table: {
    width: "100%",
    padding: "20px",
    marginBottom: "50px",
  },
  container: {
    marginTop: "30px",
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

export default StoreInvoiceSmallScreenTable;
