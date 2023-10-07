import React from "react";
import DonationPageLayout from "../components/DonationPageLayout";
import { Box } from "@mui/material";
import { DonationPageWebhooksContextProvider } from "../../../contexts/donation-page/DonationPageWebhooksContext";
import DonationPageWebhooksTable from "./components/table/DonationPageWebhooksTable";
import CreateDonationPageWebhookModal from "./components/modals/CreateDonationPageWebhookModal";
import DonationPageWebhookHeader from "./components/DonationPageWebhookHeader";

function DonationPageWebhooks() {
  return (
    <DonationPageLayout>
      <DonationPageWebhooksContextProvider>
        <Box sx={styles.container}>
          <CreateDonationPageWebhookModal />

          <DonationPageWebhookHeader />

          <Box sx={styles.content}>
            <DonationPageWebhooksTable />
          </Box>
        </Box>
      </DonationPageWebhooksContextProvider>
    </DonationPageLayout>
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

export default DonationPageWebhooks;
