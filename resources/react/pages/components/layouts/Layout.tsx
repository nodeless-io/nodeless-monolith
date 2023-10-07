import React from "react";
import { Box, Typography } from "@mui/material";
import { IMainLayout } from "../../../types/layout.interfaces";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { UserContextProvider } from "../../../contexts/user/UserContext";
import { APP_ROUTES } from "../../app.routes";
import { Link } from "react-router-dom";
import WithdrawContextProvider from "../../../contexts/withdraw/WithdrawContext";

const Layout = (props: IMainLayout) => {
  return (
    <Box sx={styles.container}>
      <UserContextProvider>
        <WithdrawContextProvider>
          <Sidebar />

          <Box sx={styles.main}>
            <Box sx={styles.content}>
              <Navbar />

              <Box sx={styles.children}>{props.children}</Box>
            </Box>

            <Box sx={styles.linksContainer}>
              <Link to={APP_ROUTES.PRIVACY_POLICY}>
                <Box sx={styles.linkItem}>
                  <Typography sx={styles.linkText}>Privacy Policy</Typography>
                </Box>
              </Link>
              <Link to={APP_ROUTES.TERMS_AND_CONDITIONS}>
                <Box sx={styles.linkItem}>
                  <Typography sx={styles.linkText}>
                    Terms and Conditions
                  </Typography>
                </Box>
              </Link>
              <Link to={APP_ROUTES.VULNERABILITY_POLICY}>
                <Box sx={styles.linkItem}>
                  <Typography sx={styles.linkText}>
                    Vulnerability Policy
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </WithdrawContextProvider>
      </UserContextProvider>
    </Box>
  );
};

const styles = {
  linkText: {
    fontSize: {
      lg: "15px",
      md: "13px",
      xs: "13px",
    },
    marginLeft: "15px",
    lineHeight: "24px",
  },
  linkItem: {
    display: "flex",
    marginBottom: "15px",
    alignItems: "center",
    color: "#6B7280",
    marginTop: {
      sm: "22px",
      lg: "unset",
      xs: "unset",
    },
    justifyContent: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
    textAlign: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
    "&:hover": {
      color: "#FF5A1F",
      "& svg": {
        color: "#5521B5",
      },
    },
    "& svg": {
      color: "#9CA3AF",
    },
  },
  container: {
    width: "100vw",
    height: "100vh",
    background: "white",
    overflow: "hidden",
    display: {
      xs: "block",
      sm: "flex",
    },
  },
  content: {
    minHeight: "100vh",
  },
  linksContainer: {
    marginTop: {
      md: "40px",
      lg: "50px",
    },
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: {
      xs: "80px",
      md: "0px",
    },
  },
  children: {
    marginTop: {
      xs: "30px",
      md: "30px",
    },
  },
  main: {
    height: {
      xs: "100%",
      md: "100vh",
    },
    overflowX: "hidden",
    overflowY: "auto",
    background: "#fff",
    width: {
      xs: "100%",
      md: "calc(100vw - 220px)",
      lg: "calc(100vw - 290px)",
    },
  },
};

export default Layout;
