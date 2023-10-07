import React from "react";
import { Box, Container, Button, ButtonGroup } from "@mui/material";

import CheckoutLightning from "./CheckoutLightning";
import CheckoutOnChain from "./CheckoutOnChain";
import CheckoutUnified from "./CheckoutUnified";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutFailure from "./CheckoutFailure";
import CheckoutExpired from "./CheckoutExpired";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutLoader from "./CheckoutLoader";
import { CheckoutContext } from "../../../contexts/CheckoutContext";

const InvoicePaymentTypes = {
  LIGHTNING: "lightning",
  ONCHAIN: "on-chain",
  UNIFIED: "unified",
};

const CheckoutContent = () => {
  const [invoicePaymentType, setInvoicePaymentType] = React.useState(
    InvoicePaymentTypes.UNIFIED
  );

  const handleChange = (paymentType: string) => {
    setInvoicePaymentType(paymentType);
  };

  const { isLoading, status, checkout } = React.useContext(CheckoutContext);

  React.useEffect(() => {
    if (
      checkout?.store_invoice?.redirect_url &&
      (status == "paid" ||
        status == "overpaid" ||
        status == "underpaid" ||
        status == "pending_confirmation")
    ) {
      setTimeout(() => {
        window.location.href = checkout?.store_invoice?.redirect_url;
      }, 1000);
    }
  }, [status, checkout]);

  if (isLoading) return <CheckoutLoader />;

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <CheckoutHeader />

      {status && status == "paid" && <CheckoutSuccess />}
      {status && status == "cancelled" && <CheckoutFailure />}
      {status && status == "expired" && <CheckoutExpired />}

      {status == "new" && (
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
            <CheckoutLightning />
          )}
          {invoicePaymentType === InvoicePaymentTypes.UNIFIED && (
            <CheckoutUnified />
          )}
          {invoicePaymentType === InvoicePaymentTypes.ONCHAIN && (
            <CheckoutOnChain />
          )}
        </Box>
      )}
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
    fontSize: "15px",
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
    fontSize: "15px",
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

export default CheckoutContent;
