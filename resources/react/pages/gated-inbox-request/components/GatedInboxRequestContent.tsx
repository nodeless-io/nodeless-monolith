import React from "react";
import { Box, Container, Button, ButtonGroup } from "@mui/material";

import GatedInboxRequestLightning from "./GatedInboxRequestLightning";
import GatedInboxRequestOnChain from "./GatedInboxRequestOnChain";
import GatedInboxRequestUnified from "./GatedInboxRequestUnified";
import GatedInboxRequestHeader from "./GatedInboxRequestHeader";
import GatedInboxRequestFailure from "./GatedInboxRequestFailure";
import GatedInboxRequestExpired from "./GatedInboxRequestExpired";
import GatedInboxRequestSuccess from "./GatedInboxRequestSuccess";
import GatedInboxRequestLoader from "./GatedInboxRequestLoader";
import GatedInboxRequestPending from "./GatedInboxRequestPending";
import { NodelessAddressMessageRequestContext } from "../../../contexts/nodeless-address/NodelessAddressMessageRequestContext";

const InvoicePaymentTypes = {
  LIGHTNING: "lightning",
  ONCHAIN: "on-chain",
  UNIFIED: "unified",
};

const GatedInboxRequestContent = () => {
  const [invoicePaymentType, setInvoicePaymentType] = React.useState(
    InvoicePaymentTypes.UNIFIED
  );

  const handleChange = (paymentType: string) => {
    setInvoicePaymentType(paymentType);
  };

  const { isLoading, status } = React.useContext(
    NodelessAddressMessageRequestContext
  );

  let content;

  if (isLoading) {
    content = <GatedInboxRequestLoader />;
  } else if (status == "new") {
    content = (
      <Box>
        <Box sx={styles.tabContainer}>
          <ButtonGroup>
            <Button
              sx={
                invoicePaymentType === InvoicePaymentTypes.LIGHTNING
                  ? styles.activeTab
                  : styles.inactiveTab
              }
              onClick={() => handleChange(InvoicePaymentTypes.LIGHTNING)}
            >
              Lightning
            </Button>
            <Button
              onClick={() => handleChange(InvoicePaymentTypes.UNIFIED)}
              sx={
                invoicePaymentType === InvoicePaymentTypes.UNIFIED
                  ? styles.activeTab
                  : styles.inactiveTab
              }
            >
              Unified
            </Button>
            <Button
              onClick={() => handleChange(InvoicePaymentTypes.ONCHAIN)}
              sx={
                invoicePaymentType === InvoicePaymentTypes.ONCHAIN
                  ? styles.activeTab
                  : styles.inactiveTab
              }
            >
              On-chain
            </Button>
          </ButtonGroup>
        </Box>

        {invoicePaymentType === InvoicePaymentTypes.LIGHTNING && (
          <GatedInboxRequestLightning />
        )}
        {invoicePaymentType === InvoicePaymentTypes.UNIFIED && (
          <GatedInboxRequestUnified />
        )}
        {invoicePaymentType === InvoicePaymentTypes.ONCHAIN && (
          <GatedInboxRequestOnChain />
        )}
      </Box>
    );
  } else if (status == "paid") {
    content = <GatedInboxRequestSuccess />;
  } else if (status == "cancelled") {
    content = <GatedInboxRequestFailure />;
  } else if (status == "expired") {
    content = <GatedInboxRequestExpired />;
  } else if (status == "pending_confirmation") {
    content = <GatedInboxRequestPending />;
  }

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <GatedInboxRequestHeader />

      {content}
    </Container>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: {
      xs: "30px 15px 60px 15px",
      md: "60px 30px",
    },
    textAlign: "center",
    justifyContent: "center",
  },

  tabsDivider: {
    marginTop: "-16px",
  },
  tabContainer: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  activeTab: {
    color: "#111928",
    fontWeight: "600",
    borderBottom: "1px solid #111928",
    textTransform: "none",
    fontSize: "14px",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
  inactiveTab: {
    color: "#4B5563",
    fontSize: "14px",
    textTransform: "none",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
};

export default GatedInboxRequestContent;
