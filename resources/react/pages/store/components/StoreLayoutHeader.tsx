import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { StoreContext } from "../../../contexts/store/StoreContext";
import StoreSelector from "./StoreSelector";

const StoreLayoutHeader = () => {
  const { setCreateStoreModalOpen } = useContext(StoreContext);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerInfo}>
        <Box sx={styles.headerIcon}>
          <StoreIcon fontSize="small" />
        </Box>

        <Typography sx={styles.headerText}>Store</Typography>
      </Box>

      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <SecondaryContainedButton
          text="Add Store"
          styles={styles.addStoreButton}
          onClick={() => setCreateStoreModalOpen(true)}
        />
      </Box>

      <Box sx={styles.selector}>
        <StoreSelector />
      </Box>
    </Box>
  );
};

const styles = {
  selector: {
    display: {
      xs: "block",
      md: "none",
    },
  },
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
  addStoreButton: {
    width: "150px",
    height: "45px",
    borderRadius: "8px",
    display: {
      xs: "none",
      md: "block",
    },
    marginRight: "10px",
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
      md: "25px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "-5px",
      md: "unset",
    },
  },
};

export default StoreLayoutHeader;
