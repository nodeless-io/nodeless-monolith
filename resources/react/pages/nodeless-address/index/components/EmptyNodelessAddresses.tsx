import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import SearchIcon from "@mui/icons-material/Search";
import { NodelessAddressContext } from "../../../../contexts/nodeless-address/NodelessAddressContext";

const EmptyNodelessAddresses = () => {
  const { setCreateNodelessAddressModal } = useContext(NodelessAddressContext);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerInfo}>
          <Box sx={styles.headerIcon}>
            <DraftsIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Nodeless Address</Typography>
        </Box>

        {/* <SecondaryContainedButton
          text="New Address"
          styles={styles.addAddressButton}
          onClick={() => setCreateNodelessAddressModal(true)}
        /> */}
      </Box>

      <Box sx={styles.content}>
        <Box sx={{ justifyContent: "center" }}>
          <SearchIcon sx={styles.icon} />

          <Typography sx={styles.label}>No Address created yet</Typography>

          <Typography sx={styles.description}>
            You haven’t created any address yet.
            <br /> Please add an address to view the contents of this page
          </Typography>

          <SecondaryContainedButton
            text="Add Address"
            styles={styles.createAddressButton}
            onClick={() => setCreateNodelessAddressModal(true)}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: "0 20px",
      md: "20px 40px",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },
  addAddressButton: {
    width: "150px",
    height: "36px",
    borderRadius: "8px",
    background: "linear-gradient(45.6deg, #911F8E -4.64%, #FD7014 110.27%)",
    "&:hover": {
      background: "#B34116",
    },
  },
  createAddressButton: {
    width: "175px",
    height: "40px",
    borderRadius: "10px",
    marginTop: "40px",
  },
  headerIcon: {
    background: "#E1EFFE",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
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
      xs: "16px",
      sm: "20px",
      md: "25px",
    },
    fontWeight: "600",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginTop: "100px",
  },
  icon: {
    background: "#F3F4F6",
    borderRadius: "50%",
    height: "68px",
    width: "68px",
    padding: "20px",
    color: "#374151",
    marginBottom: "30px",
  },
  label: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "700",
    marginTop: "30x",
    marginBottom: "20px",
  },
  description: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "150%",
    letterSpacing: "0.01em",
    fontWeight: "600",
  },
};

export default EmptyNodelessAddresses;
