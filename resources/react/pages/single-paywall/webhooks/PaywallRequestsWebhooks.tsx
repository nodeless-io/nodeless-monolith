import React from "react";
import PaywallRequestLayout from "../components/SinglePaywallLayout";
import { Box } from "@mui/material";
import { PaywallWebhooksContextProvider } from "../../../contexts/paywall/PaywallWebhooksContext";
import PaywallWebhooksTable from "./components/table/PaywallWebhooksTable";
import CreatePaywallWebhookModal from "./components/modals/CreatePaywallWebhookModal";
import PaywallWebhookHeader from "./components/PaywallWebhookHeader";

function PaywallRequestsWebhooks() {
  return (
    <PaywallRequestLayout>
      <PaywallWebhooksContextProvider>
        <Box sx={styles.container}>
          <CreatePaywallWebhookModal />

          <PaywallWebhookHeader />

          <Box sx={styles.content}>
            <PaywallWebhooksTable />
          </Box>
        </Box>
      </PaywallWebhooksContextProvider>
    </PaywallRequestLayout>
  );
}

const styles = {
  container: {
    padding: "10px 20px",
  },
  infoContainer: {
    marginTop: "20px",
  },
  content: {
    marginTop: {
      xs: "10px",
      md: "30px",
    },
  },
};

export default PaywallRequestsWebhooks;
