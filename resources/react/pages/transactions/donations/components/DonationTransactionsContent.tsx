import * as React from "react";
import { Box } from "@mui/material/";
import { DonationsTransactionsContext } from "../../../../contexts/transactions/DonationTransactionsContext";
import TransactionsTable from "../../components/TransactionsTable";
import ViewDonationTransactionModal from "./ViewDonationTransactionModal";

const DonationTransactionsContent = () => {
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
  } = React.useContext(DonationsTransactionsContext);

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

        <ViewDonationTransactionModal />
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

export default DonationTransactionsContent;
