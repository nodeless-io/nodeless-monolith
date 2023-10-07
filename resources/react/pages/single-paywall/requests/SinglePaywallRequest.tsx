import React from "react";
import PaywallRequestLayout from "../components/SinglePaywallLayout";
import PaywallRequestTable from "../components/requests/components/PaywallRequestTable";

const SinglePaywallRequest = () => {
  return (
    <PaywallRequestLayout>
      <PaywallRequestTable />
    </PaywallRequestLayout>
  );
};

export default SinglePaywallRequest;
