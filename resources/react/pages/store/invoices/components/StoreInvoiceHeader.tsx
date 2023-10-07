import React from "react";
import { Box } from "@mui/material";
import { SecondaryOutlinedButton } from "../../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import StoreInvoiceTitle from "./StoreInvoiceTitle";
import { StoreContext } from "../../../../contexts/store/StoreContext";

function StoreInvoiceHeader() {
  const { setCreateInvoiceModalOpen } = React.useContext(StoreContext);

  return (
    <Box sx={styles.header}>
      <StoreInvoiceTitle />

      <SecondaryOutlinedButton
        text="New Invoice"
        styles={styles.newInvoiceButton}
        startIcon={<AddIcon />}
        onClick={() => setCreateInvoiceModalOpen(true)}
      />
    </Box>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: {
      xs: "0 15px",
      md: "unset",
    },
  },

  newInvoiceButton: {
    width: {
      xs: "180px",
      md: "150px",
    },
    borderRadius: "24px",
    height: "38px",
    border: {
      xs: "1px solid white",
      md: "1px solid #FF5A1F",
    },
  },
};

export default StoreInvoiceHeader;
