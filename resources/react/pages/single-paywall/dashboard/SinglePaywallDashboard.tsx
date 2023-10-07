import React from "react";
import PaywallRequestLayout from "../components/SinglePaywallLayout";
import SinglePaywallDashboardContent from "./components/SinglePaywallDashboardContent";

const SinglePaywallDashboard = () => {
  return (
    <PaywallRequestLayout>
      <SinglePaywallDashboardContent />
    </PaywallRequestLayout>
  );
};

export default SinglePaywallDashboard;
