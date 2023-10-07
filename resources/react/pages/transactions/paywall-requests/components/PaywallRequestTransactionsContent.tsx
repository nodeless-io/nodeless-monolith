import * as React from "react";
import { Box } from "@mui/material/";
import { PaywallRequestTransactionsContext } from "../../../../contexts/transactions/PaywallRequestTransactionsContext";
import TransactionsTable from "../../components/TransactionsTable";
import PaywallRequestTransactionModal from "./PaywallRequestTransactionModal";

const PaywallRequestTransactionsContent = () => {
  const {
    transactions,
    loading,
    page,
    setPage,
    count,
    refetch,
    rowsPerPage,
    setCurrentTransaction,
    setViewTransactionModal,
  } = React.useContext(PaywallRequestTransactionsContext);

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
        }}
      >
        <TransactionsTable
          count={count}
          transactions={transactions}
          loading={loading}
          page={page}
          refetch={refetch}
          rowsPerPage={rowsPerPage}
          setCurrentTransaction={setCurrentTransaction}
          setPage={setPage}
          setViewTransactionModal={setViewTransactionModal}
        />

        <PaywallRequestTransactionModal />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    padding: {
      xs: 0,
      md: "0px 40px 20px 40px",
    },
  },
};

export default PaywallRequestTransactionsContent;
