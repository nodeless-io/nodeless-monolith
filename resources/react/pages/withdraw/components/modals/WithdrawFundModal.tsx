import * as React from "react";
import { Divider, Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useScreenSize from "../../../../hooks/useScreenSize";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import WithdrawFundInputAmount from "./WithdrawFundInputAmount";
import WithdrawFundsConfirmation from "./WithdrawFundsConfirmation";
import WithdrawFundSuccessful from "./WithdrawFundSuccessful";

const WithdrawFundsModal = () => {
  const { isSmallScreen } = useScreenSize();

  const {
    withdrawFundsModalOpen,
    handleWithdrawFundsModalClose,
    withdrawFundsRequest,
  } = React.useContext(WithdrawContext);

  return (
    <Dialog
      open={withdrawFundsModalOpen}
      fullScreen={isSmallScreen}
      PaperProps={{
        sx: styles.paperProps,
      }}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        style: styles.background,
      }}
      scroll="paper"
    >
      <DialogTitle sx={styles.title}>
        Withdraw Funds
        <IconButton
          aria-label="close"
          onClick={handleWithdrawFundsModalClose}
          sx={styles.smallCloseButton}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={handleWithdrawFundsModalClose}
          sx={styles.close}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {withdrawFundsRequest.tab == 0 && <WithdrawFundInputAmount />}
      {withdrawFundsRequest.tab == 1 && <WithdrawFundsConfirmation />}
      {withdrawFundsRequest.tab == 2 && <WithdrawFundSuccessful />}
    </Dialog>
  );
};

const styles = {
  textfield: {
    width: "100%",
    color: "#6B7280",
    fontSize: "14px",
    borderRadius: "8px",
  },
  formItem: {
    margin: "25px 0",
    width: "100%",
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
  title: {
    textAlign: "center",
    color: "#000000",
    fontSize: {
      xs: "16px",
      md: "18px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
  },
  tableItem: {
    color: "#6B7280",
    letterSpacing: "0.04em",
    fontSize: "14px",
    fontWeight: "600",
  },
  paperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },
    padding: "10px 0",
    minHeight: "80vh",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
};

export default WithdrawFundsModal;
