import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box } from "@mui/material";
import StoreNavigationTabs from "./StoreNavigationTabs";
import { StoreContextProvider } from "../../../contexts/store/StoreContext";
import { StoreIndexContextProvider } from "../../../contexts/store/StoreIndexContext";
import StoreSelector from "./StoreSelector";
import StoreLayoutHeader from "./StoreLayoutHeader";
import CreateStoreModal from "./CreateStoreModal";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <StoreContextProvider>
        <StoreIndexContextProvider>
          <Box sx={styles.container}>
            <StoreLayoutHeader />
            <CreateStoreModal />

            <Box sx={styles.selector}>
              <StoreSelector />
            </Box>

            <StoreNavigationTabs />

            <Box sx={styles.children}>{children}</Box>
          </Box>
        </StoreIndexContextProvider>
      </StoreContextProvider>
    </Layout>
  );
};

const styles = {
  selector: {
    display: {
      md: "block",
      xs: "none",
    },
  },
  container: {
    width: "100%",
    height: "100%",
  },
  children: {
    marginTop: "30px",
  },
};

export default StoreLayout;
