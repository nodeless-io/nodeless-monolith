import React from "react";
import StoreLayout from "../components/StoreLayout";
import { Box } from "@mui/material";
import { StoreWebhooksContextProvider } from "../../../contexts/store/StoreWebhooksContext";
import StoreWebhooksTable from "./components/StoreWebhooksTable";
import CreateStoreWebhookModal from "./components/modals/CreateStoreWebhookModal";
import StoreWebhookHeader from "./components/StoreWebhookHeader";

function StoreWebhooks() {
  return (
    <StoreLayout>
      <StoreWebhooksContextProvider>
        <Box sx={styles.container}>
          <CreateStoreWebhookModal />

          <StoreWebhookHeader />

          <Box sx={styles.content}>
            <StoreWebhooksTable />
          </Box>
        </Box>
      </StoreWebhooksContextProvider>
    </StoreLayout>
  );
}

const styles = {
  container: {
    padding: { xs: "10px 20px", md: "20px 40px" },
  },
  infoContainer: {
    marginTop: "20px",
  },
  content: {
    marginTop: "30px",
  },
};

export default StoreWebhooks;
