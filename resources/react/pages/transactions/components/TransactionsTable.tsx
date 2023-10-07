import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TablePagination,
} from "@mui/material/";
import TransactionTableItem from "./TransactionTableItem";
import EmptyTransactions from "./EmptyTransactions";
import TransactionsLoader from "./TransactionsLoader";

const TransactionsTable = ({
  transactions,
  loading,
  page,
  setPage,
  count,
  refetch,
  rowsPerPage,
  setCurrentTransaction,
  setViewTransactionModal,
}: {
  transactions: any[];
  loading: boolean;
  page: number;
  setPage: any;
  count: number;
  refetch: any;
  rowsPerPage: number;
  setCurrentTransaction: any;
  setViewTransactionModal: any;
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (loading) {
    return <TransactionsLoader />;
  }

  if (!loading && transactions?.length == 0) {
    return <EmptyTransactions />;
  }

  return (
    <Box>
      <TableContainer sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHead}>ID</TableCell>
              <TableCell sx={styles.tableHead}>Type</TableCell>
              <TableCell sx={styles.tableHead}>Amount</TableCell>

              <TableCell sx={styles.tableHead}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions &&
              transactions.map((transaction, index) => (
                <TransactionTableItem
                  key={index}
                  transaction={transaction}
                  setCurrentTransaction={setCurrentTransaction}
                  setViewTransactionModal={setViewTransactionModal}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ paddingRight: "50px", margin: "15px 0" }}>
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
      </Box>
    </Box>
  );
};

const styles = {
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
  container: {
    padding: "0px 40px 20px 40px",
  },
  header: {
    alignItems: "center",
    paddingBottom: "20px",
  },
  backButton: {
    color: "#111928",
    marginRight: "10px",
  },
  headerText: {
    color: "#111928",
    fontSize: "25px",
    fontWeight: "600",
  },
  search: {
    background: "#F3F4F6",
    borderBottom: "1px solid #E5E7EB",
    padding: "20px 30px 30px 30px",
  },
  searchText: {
    marginBottom: "15px",
    color: "#4B5563",
    letterSpacing: "0.04em",
    fontSize: "15px",
    fontWeight: "600",
  },
  tableContainer: {
    paddingTop: "30px",
    marginBottom: {
      xs: "100px",
      md: "20px",
    },
  },
  tableHead: {
    color: "#374151",
    fontSize: {
      xs: "13px",
      md: "15px",
    },
    fontWeight: "600",
  },
};

export default TransactionsTable;
