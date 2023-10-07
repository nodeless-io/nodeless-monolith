import React from "react";
import { Box, Typography, Divider, IconButton, Tooltip } from "@mui/material";
import Modal from "../../components/custom-components/Modal";
import StatusBadge from "../../components/custom-components/StatusBadge";
import { formatDate, formatUuid, formatter } from "../../../utils/Utils";
import { TransactionsContext } from "../../../contexts/transactions/TransactionsContext";

const renderDetailsItem = (label, value) => (
  <Box sx={styles.item}>
    <Typography sx={styles.detailsItemLabel}>{label}:</Typography>
    <Typography sx={styles.detailsItemValue}>{value}</Typography>
  </Box>
);

const ViewTransactionsModal = ({
  currentTransaction,
  viewTransactionModal,
  setViewTransactionModal,
}: {
  currentTransaction: any;
  viewTransactionModal: any;
  setViewTransactionModal: any;
}) => {
  const DetailsData = [
    {
      label: "Transaction ID",
      value: formatUuid(currentTransaction.uuid),
    },
    {
      label: "Created at",
      value: formatDate(currentTransaction.created_at, "hh:mm A MMM D, YYYY"),
    },
    {
      label: "Paid at",
      value: formatDate(currentTransaction.created_at, "hh:mm A MMM D, YYYY"),
    },
  ];

  return (
    <Modal
      handleClose={() => setViewTransactionModal(false)}
      open={viewTransactionModal}
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
            <Typography sx={styles.title}>Transaction:</Typography>

            <Typography
              sx={{
                ...styles.title,
                marginLeft: {
                  xs: "none",
                  md: "10px",
                },
              }}
            >
              <span>#{currentTransaction.uuid}</span>
            </Typography>
          </Box>

          <Box sx={styles.header}>
            <Typography sx={styles.amount}>
              {formatter(currentTransaction.amount)} <span>SATS</span>
            </Typography>

            <Box sx={{ marginTop: "-10px" }}>
              <StatusBadge
                status={
                  currentTransaction?.transactable?.status ||
                  currentTransaction?.status
                }
                text={
                  currentTransaction?.transactable?.status ||
                  currentTransaction?.status
                }
              />
            </Box>
          </Box>
        </Box>
      }
      isCenter={false}
    >
      <Box>
        <Box sx={styles.section}>
          <Typography sx={styles.label}>Transaction Details</Typography>

          <Box sx={styles.details}>
            {currentTransaction?.is_fee && (
              <Box sx={styles.detailsItem}>
                {renderDetailsItem("Type", "Fees")}

                <Divider />
              </Box>
            )}

            {DetailsData.map((item, index) => (
              <Box sx={styles.detailsItem} key={index}>
                {renderDetailsItem(item.label, item.value)}

                {index !== DetailsData.length && <Divider />}
              </Box>
            ))}
          </Box>
        </Box>

        {currentTransaction?.transactable?.message && (
          <Box sx={styles.section}>
            <Typography sx={styles.label}>Comments</Typography>

            <Typography sx={styles.message}>
              {currentTransaction?.transactable?.message}
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

const styles = {
  message: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#6B7280",
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
    marginBottom: "40px",
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

export default ViewTransactionsModal;
