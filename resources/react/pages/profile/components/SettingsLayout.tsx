import React from "react";
import Layout from "../../components/layouts/Layout";
import { Box, Typography } from "@mui/material";
import SettingsNavigationTabs from "./SettingsNavigationTabs";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.headerInfo}>
            <Box sx={styles.headerIcon}>
              <SettingsIcon fontSize="small" />
            </Box>

            <Typography sx={styles.headerText}>Settings</Typography>
          </Box>
        </Box>

        <SettingsNavigationTabs />

        <Box sx={styles.children}>{children}</Box>
      </Box>
    </Layout>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: 0,
      sm: "10px",
      md: "0 20px",
    },
  },
  children: {
    marginTop: "30px",
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
};

export default SettingsLayout;
