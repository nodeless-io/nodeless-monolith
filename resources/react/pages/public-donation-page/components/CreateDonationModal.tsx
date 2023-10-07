import React from "react";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useScreenSize from "../../../hooks/useScreenSize";
import DonationExpired from "./DonationExpired";
import DonationOnChain from "./DonationOnChain";
import DonationFailure from "./DonationFailure";
import DonationLightning from "./DonationLightning";
import DonationSuccess from "./DonationSuccess";
import DonationUnified from "./DonationUnified";
import { formatter } from "../../../utils/Utils";

const InvoicePaymentTypes = {
  LIGHTNING: "lightning",
  ONCHAIN: "on-chain",
  UNIFIED: "unified",
};

const CreateDonationModal = () => {
  const {
    setDonationModal,
    donationModal,
    newDonation,
    status,
    donationPage,
    clearDonationDetails,
  } = React.useContext(PublicDonationPageContext);

  const { isSmallScreen } = useScreenSize();
  const handleClose = () => {
    setDonationModal(false);
    clearDonationDetails();
  };

  const [invoicePaymentType, setInvoicePaymentType] = React.useState(
    InvoicePaymentTypes.UNIFIED
  );

  const handleChange = (paymentType: string) => {
    setInvoicePaymentType(paymentType);
  };

  return (
    <Dialog
      open={donationModal}
      fullScreen={isSmallScreen}
      PaperProps={{
        sx: styles.centerPaperProps,
      }}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        style: styles.background,
      }}
      scroll="paper"
    >
      <DialogTitle sx={styles.centerTitle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.smallCloseButton}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        <IconButton aria-label="close" onClick={handleClose} sx={styles.close}>
          <CloseIcon />
        </IconButton>

        <Box>
          <Typography
            sx={{
              color: "#6B7280",
              fontSize: {
                xs: "14px",
                md: "15px",
              },
              marginTop: "20px",
              fontWeight: "600",
            }}
          >
            You are donating
          </Typography>

          <Stack
            direction="row"
            sx={{
              textAlign: "center",
              width: "100%",
              justifyContent: "center",
              margin: "10px 0",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#1F2A37",
                marginRight: "7px",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              {formatter(newDonation?.donation?.amount)}
            </Typography>
            <Typography
              sx={{ color: "#9CA3AF", fontSize: "30px", fontWeight: "600" }}
            >
              SATS
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#6B7280",
              fontSize: {
                xs: "13px",
                md: "14px",
              },
              lineHeight: "150%",
              fontWeight: "600",
            }}
          >
            {donationPage?.description}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={styles.content}>
        <Box sx={{ justifyContent: "center", textAlign: "center" }}>
          {status && status == "paid" && <DonationSuccess />}
          {status && status == "cancelled" && <DonationFailure />}
          {status && status == "expired" && <DonationExpired />}

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
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  activeTab: {
    color: "#111928",
    fontWeight: "600",
    borderBottom: "1px solid #111928",
    textTransform: "none",
    fontSize: {
      xs: "13px",
      md: "15px",
    },
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
    fontSize: {
      xs: "13px",
      md: "15px",
    },
    textTransform: "none",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },

  tabContainer: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  centerTitle: {
    textAlign: "center",
    color: "#1F2A37",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
    background: "#FBFBF9",
    padding: "40px 20px",
    width: "100%",
  },

  centerPaperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },
    padding: 0,
  },

  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    color: "#374151",
    display: {
      xs: "none",
      md: "block",
    },
  },
  smallCloseButton: {
    position: "absolute",
    left: 10,
    top: 12,
    color: "#374151",
    display: {
      md: "none",
      xs: "block",
    },
  },
  content: {
    marginTop: {
      xs: "30px",
      md: "10px",
    },
    width: {
      xs: "100%",
      md: "unset",
    },
  },
};

export default CreateDonationModal;
