import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { NodelessAddressContext } from "../../../contexts/nodeless-address/NodelessAddressContext";
import NodelessAddressSelector from "./NodelessAddressSelector";
import DraftsIcon from "@mui/icons-material/Drafts";

const NodelessAddressLayoutHeader = () => {
  const { setCreateNodelessAddressModal } = useContext(NodelessAddressContext);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerInfo}>
        <Box sx={styles.headerIcon}>
          <DraftsIcon fontSize="small" />
        </Box>

        <Typography sx={styles.headerText}>Nodeless Address</Typography>
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
          text="New Address"
          styles={styles.addAddressButton}
          onClick={() => setCreateNodelessAddressModal(true)}
        />
      </Box>

      <Box sx={styles.selector}>
        <NodelessAddressSelector />
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
  addAddressButton: {
    width: "175px",
    height: "45px",
    borderRadius: "8px",
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
      xs: "14px",
      md: "25px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "-5px",
      md: "unset",
    },
  },
};

export default NodelessAddressLayoutHeader;
