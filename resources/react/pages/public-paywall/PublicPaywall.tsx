import React from "react";
import { PublicPaywallContextProvider } from "../../contexts/paywall/PublicPaywallContext";
import PublicPaywallContent from "./components/PublicPaywallContent";

const PublicPaywall = () => {


  return (
    <PublicPaywallContextProvider>
      <PublicPaywallContent />
    </PublicPaywallContextProvider>
  );
};

export default PublicPaywall;
