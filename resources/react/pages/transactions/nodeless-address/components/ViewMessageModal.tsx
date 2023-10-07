import React from "react";
import { Skeleton, Box, Stack, Typography } from "@mui/material";
import Modal from "../../../components/custom-components/Modal";
import { NodelessAddressTransactionsContext } from "../../../../contexts/transactions/NodelessAddressTransactionsContext";
import { formatDate, formatter } from "../../../../utils/Utils";

function SkeletonContent() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rounded" height={100} />
    </Stack>
  );
}

function SkeletonTitle() {
  return (
    <Stack spacing={1} sx={{ marginTop: "20px" }}>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="rectangular" width={210} height={30} />
    </Stack>
  );
}

const ViewMessageModal = () => {
  const {
    viewTransactionModal,
    setViewTransactionModal,
    currentMessage,
    messageLoading,
  } = React.useContext(NodelessAddressTransactionsContext);
  
  return (
    <Modal
      handleClose={() => setViewTransactionModal(false)}
      open={viewTransactionModal}
      title={
        messageLoading ? (
          <SkeletonTitle />
        ) : (
          <Box sx={styles.titleHeader}>
            <Typography sx={styles.title}>{currentMessage?.from}</Typography>
            <Typography sx={styles.amount}>
              {formatter(currentMessage?.amount)} <span>SATS</span>
            </Typography>
            <Typography sx={styles.date}>
              {formatDate(currentMessage?.created_at)}
            </Typography>
          </Box>
        )
      }
      isCenter={false}
    >
      <Box>
        {messageLoading ? (
          <SkeletonContent />
        ) : (
          <>
            <Typography sx={styles.label}>{currentMessage?.subject}</Typography>
            <Box sx={styles.section}>
              <Typography sx={styles.text} variant="body1">
                {currentMessage?.body}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

const styles = {
  amount: {
    marginTop: "10px",
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
  smallDivider: {
    marginBottom: "40px",
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
  titleHeader: {
    display: "block",
    marginTop: "10px",
    marginLeft: "10px",
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
    fontSize: "15px",
    color: "#1F2A37",
    marginTop: "20px",
  },
  date: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "10px",
  },
  text: {
    color: "#6B7280",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "160%",
    letterSpacing: "0.04em",
  },
  attachment: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#1F2A37",
  },
  downloadButton: {
    textTransform: "none",
    textDecoration: "underline",
    "&:hover": {
      textTransform: "none",
      textDecoration: "underline",
    },
  },
};

export default ViewMessageModal;
