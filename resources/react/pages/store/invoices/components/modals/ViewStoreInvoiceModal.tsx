import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import StoreInvoiceStatusBadge from "../StoreInvoiceStatusBadge";
import {
  formatDate,
  copyToClipboard,
  formatter,
} from "../../../../../utils/Utils";
import { StoreContext } from "../../../../../contexts/store/StoreContext";
import { StoreInvoiceContext } from "../../../../../contexts/store/StoreInvoiceContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ViewStoreInvoiceModal = () => {
  const { viewInvoiceModalOpen, setViewInvoiceModalOpen } = React.useContext(
    StoreContext
  );
  const { currentInvoice: invoice } = React.useContext(StoreInvoiceContext);

  const copyInvoiceLink = (link) => {
    copyToClipboard(link);
  };

  return (
    <Modal
      handleClose={() => setViewInvoiceModalOpen(false)}
      open={viewInvoiceModalOpen}
      title={
        <Box sx={{ marginTop: "10px" }}>
          <Box
            sx={{
              display: {
                xs: "block",
                md: "flex",
              },
            }}
          >
            <Typography sx={styles.title}>Invoice:</Typography>

            <Typography
              sx={{
                ...styles.title,
                marginLeft: {
                  xs: "none",
                  md: "10px",
                },
              }}
            >
              <span>#{invoice.uuid}</span>
            </Typography>
          </Box>

          <Box sx={styles.header}>
            <Typography sx={styles.amount}>
              {formatter(invoice.amount)} <span>SATS</span>
            </Typography>

            <Box sx={{ marginTop: "-10px" }}>
              <StoreInvoiceStatusBadge status={invoice.status} />
            </Box>
          </Box>
        </Box>
      }
      isCenter={false}
    >
      <Box>
        <Box sx={styles.section}>
          <Typography sx={styles.label}>Invoice Details</Typography>

          <Grid container spacing={2} sx={styles.details}>
            <Grid item xs={12} md={4} sx={styles.leftGrid}>
              <Typography sx={styles.detailsItemLabel}>Created at:</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={8}
              sx={styles.rightGrid}
              //   onClick={() =>
              //     copyToClipboard(
              //       currentDonation?.uuid,
              //       "Transaction ID copied to clipboard"
              //     )
              //   }
            >
              <Typography sx={styles.detailsItemValue}>
                {formatDate(invoice.created_at, "hh:mm A MMM D, YYYY")}
              </Typography>
            </Grid>
          </Grid>

          {invoice.redirect_url && (
            <>
              <Divider sx={styles.smallDivider} />

              <Grid container spacing={2} sx={styles.details}>
                <Grid item xs={12} md={4} sx={styles.leftGrid}>
                  <Typography sx={styles.detailsItemLabel}>
                    Redirect url:
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8} sx={styles.rightGrid}>
                  <Typography sx={styles.detailsItemValue}>
                    {invoice.redirect_url}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}

          {invoice.buyer_email && (
            <>
              <Divider sx={styles.smallDivider} />
              <Grid container spacing={2} sx={styles.details}>
                <Grid item xs={12} md={4} sx={styles.leftGrid}>
                  <Typography sx={styles.detailsItemLabel}>
                    Buyer email:
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8} sx={styles.rightGrid}>
                  <Typography sx={styles.detailsItemValue}>
                    {invoice.buyer_email}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Box>

        <Box sx={styles.section}>
          <Typography sx={styles.label}>Invoice Link</Typography>

          <Box sx={styles.copyContainer}>
            <Typography sx={styles.invoiceLink}>
              {`${window.location.origin}/checkout/${invoice.uuid}`}
            </Typography>

            <Tooltip title="Copy invoice link">
              <IconButton
                size="small"
                sx={{
                  marginLeft: "5px",
                  background: "#E5E7EB",
                  borderRadius: 2,
                  padding: "10px",
                  "&:hover": { background: "#E5E7EB" },
                }}
                onClick={() =>
                  copyInvoiceLink(
                    `${window.location.origin}/checkout/${invoice.uuid}`
                  )
                }
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  leftGrid: {
    textAlign: "left",
    wordWrap: "break-word",
  },
  rightGrid: {
    textAlign: {
      xs: "left",
      md: "right",
    },
    wordWrap: "break-word",
    marginTop: {
      xs: "-20px",
      md: "unset",
    },
  },
  invoiceLink: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
    position: "relative",
  },
  copyContainer: {
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "10px",
    height: "50px",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  smallDivider: {
    margin: "10px 0",
  },
  details: {
    marginTop: "10px",
  },
  item: {
    display: {
      xs: "block",
      md: "flex",
    },
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  detailsItem: {
    marginBottom: "20px",
  },
  detailsItemLabel: {
    color: "#9CA3AF",
    fontSize: "13px",
    fontWeight: "600",
    marginRight: "10px",
    marginBottom: {
      xs: "10px",
      md: "unset",
    },
  },
  detailsItemValue: {
    color: "#1F2A37",
    fontSize: "13px",
    fontWeight: "600",
  },

  title: {
    color: "#1F2A37",
    fontSize: "14px",
    fontWeight: "700",
    lineheight: "19px",
    letterSpacing: "0.04em",
    "& span": {
      color: "#9CA3AF",
      fontSize: "13px",
    },
  },
  header: {
    display: {
      xs: "block",
      md: "flex",
    },
    alignItems: "center",
    marginTop: "10px",
    width: "100%",
    justifyContent: {
      xs: "center",
      md: "unset",
    },
  },
  amount: {
    marginRight: "15px",
    color: "#1F2A37",
    fontSize: "20px",
    fontWeight: "700",
    lineheight: "100%",
    letterSpacing: "0.01em",
    marginBottom: {
      xs: "10px",
      md: "none",
    },
    "& span": {
      xs: "#9CA3AF",
      md: "#1F2A37",
    },
  },
  section: {
    background: "#F9FAFB",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  label: {
    marginBottom: "20px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#FF5A1F",
  },
};

export default ViewStoreInvoiceModal;
