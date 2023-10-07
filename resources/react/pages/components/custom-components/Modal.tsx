import * as React from "react";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useScreenSize from "../../../hooks/useScreenSize";

const CustomModal = ({
  title,
  open,
  handleClose,
  children,
  isCenter = true,
  isDivider = true,
  maxWidth = "xs",
}: {
  title: string | React.ReactNode;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  isCenter?: boolean;
  isDivider?: boolean;
  maxWidth?: any;
}) => {
  const { isSmallScreen } = useScreenSize();

  return (
    <Dialog
      open={open}
      fullScreen={isSmallScreen}
      PaperProps={{
        sx: isCenter ? styles.centerPaperProps : styles.topRightPaperProps,
      }}
      fullWidth
      maxWidth={maxWidth}
      BackdropProps={{
        style: styles.background,
      }}
      scroll="paper"
      onClose={handleClose}
    >
      <DialogTitle sx={isCenter ? styles.centerTitle : styles.rightTitle}>
        {title}

        <IconButton onClick={handleClose} sx={styles.smallCloseButton}>
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        <IconButton onClick={() => handleClose()} sx={styles.close}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {isDivider && <Divider />}

      <DialogContent sx={styles.content}>{children}</DialogContent>
    </Dialog>
  );
};

const styles = {
  centerTitle: {
    textAlign: "center",
    color: "#000000",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
  },
  rightTitle: {
    textAlign: {
      xs: "center",
      md: "left",
    },
    color: "#000000",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
    marginTop: {
      xs: "10px",
      md: "15px",
    },
  },

  centerPaperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },
    padding: "10px",
  },
  topRightPaperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },

    height: "100%",
    position: {
      xs: "unset",
      md: "fixed",
    },
    top: "30px",
    right: "30px",
    m: 0,
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
      xs: "0px",
      md: "10px",
    },
    width: {
      xs: "100%",
      md: "unset",
    },
    overflowY: "auto",
    overflowX: "hidden",
    padding: {
      xs: "0px",
      md: "20px",
    },
  },
};

export default CustomModal;
