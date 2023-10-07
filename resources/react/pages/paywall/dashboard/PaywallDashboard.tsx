import React from "react";
import { PaywallMetricsContextProvider } from "../../../contexts/paywall/PaywallMetricsContext";
import PaywallDashboardContent from "./PaywallDashboardContent";
import PaywallLayout from "../components/PaywallLayout";

import "./styles.css";

const PaywallDashboard = () => {
  return (
    <PaywallLayout>
      <PaywallMetricsContextProvider>
        <PaywallDashboardContent />
      </PaywallMetricsContextProvider>
    </PaywallLayout>
  );
};

export default PaywallDashboard;
