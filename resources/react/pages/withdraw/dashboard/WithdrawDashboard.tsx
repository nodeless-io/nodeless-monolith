import React from "react";
import WithdrawLayout from "../components/WithdrawLayout";
import { Box } from "@mui/material";
import WithdrawHeader from "./components/WithdrawHeader";
import WithdrawMetrics from "./components/WithdrawMetrics";
import WithdrawMetricsChart from "./components/WithdrawMetricsChart";
import RecentWithdrawals from "./components/RecentWithdrawals";
import ViewWithdrawalModal from "./components/modals/ViewWithdrawalModal";

const WithdrawDashboard = () => {
  return (
    <WithdrawLayout>
      <Box sx={styles.container}>
        <WithdrawHeader />

        <ViewWithdrawalModal />

        <WithdrawMetrics />

        <WithdrawMetricsChart />

        <RecentWithdrawals />
      </Box>
    </WithdrawLayout>
  );
};

const styles = {
  container: {
    padding: {
      xs: "0 20px",
      md: "20px",
    },
  },
};

export default WithdrawDashboard;
