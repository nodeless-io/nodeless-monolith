import React from "react";
import { Box, Typography } from "@mui/material";
import Modal from "../../../components/custom-components/Modal";
import { NodelessAddressMessageContext } from "../../../../contexts/nodeless-address/NodelessAddressMessageContext";
import { formatDate } from "../../../../utils/Utils";

const ViewMessageModal = () => {
  const {
    nodelessAddressMessageModalOpen,
    setNodelessAddressMessageModalOpen,
    currentMessage,
  } = React.useContext(NodelessAddressMessageContext);

  return (
    <Modal
      handleClose={() => setNodelessAddressMessageModalOpen(false)}
      open={nodelessAddressMessageModalOpen}
      title={
        <Box sx={styles.titleHeader}>
          <Typography sx={styles.title}>{currentMessage?.from}</Typography>
          <Typography sx={styles.date}>
            {formatDate(currentMessage?.created_at)}
          </Typography>
        </Box>
      }
      isCenter={false}
    >
      <Box>
        <Typography sx={styles.label}>{currentMessage?.subject}</Typography>

        <Box sx={styles.section}>
          <Typography sx={styles.text} variant="body1">
            {currentMessage?.body}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
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
    marginLeft: "20px",
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
