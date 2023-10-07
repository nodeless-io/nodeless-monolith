import React from "react";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { WithdrawContext } from "../../../contexts/withdraw/WithdrawContext";

const WithdrawHeader = () => {
  const { handleWithdrawFundsModalOpen } = React.useContext(WithdrawContext);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerInfo}>
        <Box sx={styles.headerIcon}>
          <NotificationsIcon fontSize="small" />
        </Box>

        <Typography sx={styles.headerText}>Withdraw</Typography>
      </Box>

      <Box
        sx={{
          width: {
            xs: "unset",
            sm: "180px",
            md: "180px",
          },
        }}
      >
        {/* <SecondaryContainedButton
          text="Withdraw Funds"
          styles={styles.withdrawFundsButton}
          onClick={handleWithdrawFundsModalOpen}
        /> */}
      </Box>
    </Box>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: {
      xs: "0px 20px",
    },
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },
  withdrawFundsButton: {
    height: {
      xs: "30px",
      sm: "40px",
    },
    borderRadius: "8px",
    "&:hover": {
      background: "#B34116",
    },
    display: {
      xs: "none",
      md: "block",
    },
  },
  headerIcon: {
    background: "#FFECE3",
    borderRadius: "50%",
    height: {
      xs: "27px",
      md: "30px",
    },
    width: {
      xs: "27px",
      md: "30px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FF5A1F",
    padding: "2px",
    marginRight: "15px",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "25px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "-5px",
      md: "unset",
    },
  },
};

export default WithdrawHeader;
