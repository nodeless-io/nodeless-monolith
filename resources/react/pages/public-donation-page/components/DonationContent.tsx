import React from "react";
import { Box, Container, Button, ButtonGroup } from "@mui/material";
import DonationLightning from "./DonationLightning";
import DonationOnChain from "./DonationOnChain";
import DonationUnified from "./DonationUnified";
import DonationHeader from "./DonationHeader";
import DonationFailure from "./DonationFailure";
import DonationExpired from "./DonationExpired";
import DonationSuccess from "./DonationSuccess";
import DonationPending from "./DonationPending";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";

const InvoicePaymentTypes = {
  LIGHTNING: "lightning",
  ONCHAIN: "on-chain",
  UNIFIED: "unified",
};

const DonationContent = () => {
  const [invoicePaymentType, setInvoicePaymentType] = React.useState(
    InvoicePaymentTypes.LIGHTNING
  );

  const handleChange = (paymentType: string) => {
    setInvoicePaymentType(paymentType);
  };

  const { status } = React.useContext(PublicDonationPageContext);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <DonationHeader />

      {status && status == "paid" && <DonationSuccess />}

      {status && status == "cancelled" && <DonationFailure />}

      {status && status == "expired" && <DonationExpired />}

      {status && (status == "pending_confirmation" || status == "pending") && (
        <DonationPending />
      )}

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
            <DonationLightning />
          )}
          {invoicePaymentType === InvoicePaymentTypes.UNIFIED && (
            <DonationUnified />
          )}
          {invoicePaymentType === InvoicePaymentTypes.ONCHAIN && (
            <DonationOnChain />
          )}
        </Box>
      )}
    </Container>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: "60px 30px",
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

export default DonationContent;
