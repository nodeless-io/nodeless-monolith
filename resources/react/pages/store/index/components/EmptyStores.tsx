import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import SearchIcon from "@mui/icons-material/Search";
import { StoreContext } from "../../../../contexts/store/StoreContext";

const EmptyStores = () => {
  const { setCreateStoreModalOpen } = useContext(StoreContext);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerInfo}>
          <Box sx={styles.headerIcon}>
            <StoreIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Store</Typography>
        </Box>

        <SecondaryContainedButton
          text="Add Store"
          styles={styles.addStoreButton}
          onClick={() => setCreateStoreModalOpen(true)}
        />
      </Box>

      <Box sx={styles.content}>
        <Box sx={{ justifyContent: "center" }}>
          <SearchIcon sx={styles.icon} />

          <Typography sx={styles.label}>
            You haven't created a store yet
          </Typography>

          <SecondaryContainedButton
            text="Create Store"
            styles={styles.createStoreButton}
            onClick={() => setCreateStoreModalOpen(true)}
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
  addStoreButton: {
    width: "150px",
    height: "40px",
    borderRadius: "24px",
  },
  createStoreButton: {
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
    fontSize: "25px",
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

export default EmptyStores;
