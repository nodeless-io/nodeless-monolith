import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import {
  formatDate,
  copyToClipboard,
  formatter,
  formatUuid,
} from "../../../../../utils/Utils";
import { SinglePaywallContext } from "../../../../../contexts/paywall/SinglePaywallContext";
import PaywallRequestStatusBadge from "./PaywallRequestStatusBadge";

const ViewPaywallRequestModal = () => {
  const {
    viewRequestModal,
    setViewRequestModal,
    currentRequest,
    paywall,
  } = React.useContext(SinglePaywallContext);

  return (
    <Modal
      handleClose={() => setViewRequestModal(false)}
      open={viewRequestModal}
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
            <Typography sx={styles.title}>Request Details:</Typography>

            <Typography
              sx={{
                ...styles.title,
                marginLeft: {
                  xs: "none",
                  md: "10px",
                },
              }}
            >
              <span>{paywall?.name}</span>
            </Typography>
          </Box>

          <Box sx={styles.header}>
            <Typography sx={styles.amount}>
              {formatter(currentRequest?.amount)} <span>SATS</span>
            </Typography>

            <Box sx={{ marginTop: "-10px" }}>
              <PaywallRequestStatusBadge status={currentRequest.status} />
            </Box>
          </Box>
        </Box>
      }
      isCenter={false}
    >
      <Box>
        <Box sx={styles.section}>
          <Typography sx={styles.label}>Request Details</Typography>

          <Box sx={styles.details}>
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={4} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>ID:</Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={8}
                sx={styles.rightGrid}
                onClick={() =>
                  copyToClipboard(
                    currentRequest?.uuid,
                    "Request ID copied to clipboard"
                  )
                }
              >
                <Typography sx={styles.detailsItemValue}>
                  {formatUuid(currentRequest?.uuid)}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.smallDivider} />

            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={4} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>Type:</Typography>
              </Grid>

              <Grid item xs={12} md={8} sx={styles.rightGrid}>
                <Typography sx={styles.detailsItemValue}>
                  {currentRequest?.type == "lightning"
                    ? "Lightning"
                    : "On Chain"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.smallDivider} />

            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={4} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>
                  Created at:
                </Typography>
              </Grid>

              <Grid item xs={12} md={8} sx={styles.rightGrid}>
                <Typography sx={styles.detailsItemValue}>
                  {formatDate(currentRequest.created_at, "hh:mm A MMM D, YYYY")}
                </Typography>
              </Grid>
            </Grid>
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
  description: {
    color: "#6B7280",
    fontWeight: "400",
    fontSize: "14px",
    letterSpacing: "0.01em",
    lineHeight: "150%",
    margin: "15px 5px 20px 5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    lineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  smallDivider: {
    margin: "10px 0",
  },
  details: {
    // marginTop: "10px",
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
    lineHeight: "19px",
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
      color: "#9CA3AF",
    },
  },
  section: {
    background: "#F9FAFB",
    borderRadius: {
      xs: "0px",
      md: "20px",
    },
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

export default ViewPaywallRequestModal;
