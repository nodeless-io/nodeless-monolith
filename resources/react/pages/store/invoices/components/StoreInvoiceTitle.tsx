import React from "react";
import { Typography } from "@mui/material";
import { StoreIndexContext } from "../../../../contexts/store/StoreIndexContext";
import { useParams } from "react-router-dom";

function StoreInvoiceTitle() {
  const { stores } = React.useContext(StoreIndexContext);
  const { storeId } = useParams();

  const getStoreName = () => {
    if (stores) {
      const filteredStore = stores.find((store) => store.uuid === storeId);
      return filteredStore?.name;
    }

    return "";
  };

  return (
    <Typography sx={styles.headerText}>{getStoreName()} Invoice</Typography>
  );
}

const styles = {
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "20px",
    },
    fontWeight: "600",
    lineHeight: "100%",
  },
};

export default StoreInvoiceTitle;
