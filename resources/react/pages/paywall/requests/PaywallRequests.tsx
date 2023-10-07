import React from "react";
import PaywallLayout from "../components/PaywallLayout";
import { PaywallRequestContextProvider } from "../../../contexts/paywall/PaywallRequestsContext";
import { SinglePaywallContextProvider } from "../../../contexts/paywall/SinglePaywallContext";
import PaywallRequestTable from "./components/PaywallRequestTable";
import ViewPaywallRequestModal from "./components/ViewPaywallRequestModal";

function PaywallRequests() {
  return (
    <PaywallLayout>
      <PaywallRequestContextProvider>
        <SinglePaywallContextProvider>
          <PaywallRequestTable />
          <ViewPaywallRequestModal />
        </SinglePaywallContextProvider>
      </PaywallRequestContextProvider>
    </PaywallLayout>
  );
}

export default PaywallRequests;
