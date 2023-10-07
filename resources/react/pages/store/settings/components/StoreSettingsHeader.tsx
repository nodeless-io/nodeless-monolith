import React from "react";
import { Box, Typography } from "@mui/material";
import { StoreIndexContext } from "../../../../contexts/store/StoreIndexContext";
import { StoreContext } from "../../../../contexts/store/StoreContext";
import { useParams } from "react-router-dom";
import UpdateStoreSettingsModal from "./modals/UpdateStoreSettingsModal";

function StoreSettingsTitle() {
  const { stores } = React.useContext(StoreIndexContext);
  const { storeId } = useParams();
  const { store } = React.useContext(StoreContext);

  const getStoreName = () => {
    if (stores) {
      const filteredStore = stores.find((store) => store.uuid === storeId);
      return filteredStore?.name;
    }

    return "";
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.headerText}>{getStoreName()} Settings</Typography>

      <UpdateStoreSettingsModal store={store} />
    </Box>
  );
}

const styles = {
  container: {
    padding: {
      xs: "10px 20px",
      md: "none",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
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

export default StoreSettingsTitle;
