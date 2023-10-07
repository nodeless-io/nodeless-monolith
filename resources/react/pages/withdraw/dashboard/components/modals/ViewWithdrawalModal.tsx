import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import WithdrawStatusBadge from "../WithdrawStatusBadge";
import { formatter, copyToClipboard } from "../../../../../utils/Utils";
import { WithdrawContext } from "../../../../../contexts/withdraw/WithdrawContext";
import JSONPretty from "react-json-pretty";

const ViewWithdrawalModal = () => {
  const {
    viewWithdrawalModalOpen,
    setViewWithdrawalModalOpen,
    currentWithdrawal,
  } = React.useContext(WithdrawContext);

  const isTestnet =
    window.location.href.includes("testnet") ||
    location.hostname === "localhost";

  const MEMPOOL_TX_URL = isTestnet
    ? "https://mempool.space/testnet/tx"
    : "https://mempool.space/tx";

  const MEMPOOL_ADDRESS_URL = isTestnet
    ? "https://mempool.space/testnet/address"
    : "https://mempool.space/address";

  return (
    <Modal
      handleClose={() => setViewWithdrawalModalOpen(false)}
      open={viewWithdrawalModalOpen}
      maxWidth="sm"
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
            <Typography sx={styles.title}>Withdraw:</Typography>

            <Typography
              sx={{
                ...styles.title,
                marginLeft: {
                  xs: "none",
                  md: "10px",
                },
              }}
            >
              <span>#{currentWithdrawal.uuid}</span>
            </Typography>
          </Box>

          <Box sx={styles.header}>
            <Typography sx={styles.amount}>
              {formatter(currentWithdrawal.amount)} <span>SATS</span>
            </Typography>

            <Box sx={{ marginTop: "-10px" }}>
              <WithdrawStatusBadge status={currentWithdrawal.status} />
            </Box>
          </Box>
        </Box>
      }
      isCenter={false}
    >
      <Box>
        <Box sx={styles.section}>
          <Typography sx={styles.label}>Withdraw Details</Typography>

          <Grid container spacing={2} sx={styles.details}>
            <Grid item xs={12} md={3} sx={styles.leftGrid}>
              <Typography sx={styles.detailsItemLabel}>Mode:</Typography>
            </Grid>

            <Grid item xs={12} md={9} sx={styles.rightGrid}>
              <Typography sx={styles.detailsItemValue}>
                {currentWithdrawal.type === "lightning"
                  ? "Lightning"
                  : "On Chain"}
              </Typography>
            </Grid>
          </Grid>

          {currentWithdrawal.type === "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>Address:</Typography>
              </Grid>

              <Grid item xs={12} md={9} sx={styles.rightGrid}>
                <Typography sx={styles.detailsItemValue}>
                  {currentWithdrawal.lightning_address}
                </Typography>
              </Grid>
            </Grid>
          )}

          {currentWithdrawal.type !== "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>Address:</Typography>
              </Grid>

              <Grid item xs={12} md={9} sx={styles.rightGrid}>
                <a
                  target="_blank"
                  style={{
                    color: "#FF5A1F",

                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  href={`${MEMPOOL_ADDRESS_URL}/${currentWithdrawal?.onchain_address}`}
                >
                  {currentWithdrawal?.onchain_address}
                </a>
              </Grid>
            </Grid>
          )}

          {currentWithdrawal.type === "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>
                  Payment Hash:
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={9}
                sx={{ ...styles.rightGrid, cursor: "pointer" }}
                onClick={() =>
                  copyToClipboard(
                    currentWithdrawal.lightning_payment_hash,
                    "Lightning payment hash copied to clipboard"
                  )
                }
              >
                <Typography sx={styles.detailsItemValue}>
                  {currentWithdrawal.lightning_payment_hash}
                </Typography>
              </Grid>
            </Grid>
          )}

          {currentWithdrawal.type === "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>
                  Payment Pre Image:
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={9}
                sx={{ ...styles.rightGrid, cursor: "pointer" }}
                onClick={() =>
                  copyToClipboard(
                    currentWithdrawal.lightning_payment_preimage,
                    "Lightning payment pre image copied to clipboard"
                  )
                }
              >
                <Typography sx={styles.detailsItemValue}>
                  {currentWithdrawal.lightning_payment_preimage}
                </Typography>
              </Grid>
            </Grid>
          )}

          {currentWithdrawal.type !== "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>
                  Onchain TX:
                </Typography>
              </Grid>

              <Grid item xs={12} md={9} sx={styles.rightGrid}>
                <a
                  target="_blank"
                  style={{
                    color: "#FF5A1F",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  href={`${MEMPOOL_TX_URL}/${currentWithdrawal?.onchain_tx}`}
                >
                  {currentWithdrawal?.onchain_tx}
                </a>
              </Grid>
            </Grid>
          )}

          {currentWithdrawal.type === "lightning" && (
            <Grid container spacing={2} sx={styles.details}>
              <Grid item xs={12} md={3} sx={styles.leftGrid}>
                <Typography sx={styles.detailsItemLabel}>
                  Payment Route:
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={9}
                sx={{
                  ...styles.rightGrid,
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(currentWithdrawal.lightning_payment_route),
                    "Lightning payment route copied to clipboard"
                  )
                }
              >
                <JSONPretty
                  data={currentWithdrawal.lightning_payment_route}
                  //   theme={JSONPrettyMon}
                  mainStyle="padding:1em"
                  valueStyle="font-size:14px;font-weight:600;color:#FF5A1F"
                  keyStyle="font-size:14px;font-weight:600;color:#1F2A37"
                  booleanStyle="font-size:14px;font-weight:600;color:#FF5A1F"
                  stringStyle="font-size:14px;font-weight:600;color:#FF5A1F"
                ></JSONPretty>
              </Grid>
            </Grid>
          )}
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

  details: {
    marginTop: "7px",
    width: "100%",
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
    wordWrap: "break-word",
    width: "100%",
  },
  detailsItemLabel: {
    color: "#9CA3AF",
    fontSize: "13px",
    fontWeight: "600",
    marginRight: "10px",
    wordWrap: "break-word",
    marginBottom: {
      xs: "10px",
      md: "unset",
    },
  },
  detailsItemValue: {
    color: "#1F2A37",
    fontSize: "13px",
    fontWeight: "600",
    wordWrap: "break-word",
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
      xs: "#9CA3AF",
      md: "#1F2A37",
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

export default ViewWithdrawalModal;
