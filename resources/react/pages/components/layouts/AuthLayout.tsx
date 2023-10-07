import React from "react";
import { IAuthLayout } from "../../../types/layout.interfaces";
import { Box, Grid, Button } from "@mui/material";
import Logo from "../logo/Logo";
import AuthLogo from "../../assets/svg/auth-logo.svg";
import { APP_ROUTES } from "../../app.routes";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../../../hooks/useAuth";

const AuthLayout = (props: IAuthLayout) => {
  const isLogged = checkAuthStatus();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogged) {
      navigate(APP_ROUTES.DASHBOARD);
    }
  }, [isLogged]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
      }}
    >
      <Grid container sx={styles.container}>
        <Grid item xs={12} md={3} sx={styles.sideSection}>
          <Logo />

          {props.isSignupButtonShown && (
            <Button
              sx={styles.smallSignupButton}
              variant="outlined"
              component={Link}
              to={APP_ROUTES.SIGNUP}
            >
              Sign Up
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4} sx={styles.children}>
          {props.children}
        </Grid>

        <Grid item xs={12} md={5} sx={styles.thirdSection}>
          {props.isSignupButtonShown && (
            <Button
              sx={styles.signupButton}
              variant="outlined"
              component={Link}
              to={APP_ROUTES.SIGNUP}
            >
              Sign Up
            </Button>
          )}

          <Box sx={styles.imgContainer}>
            <img src={AuthLogo} className="auth-logo" />
          </Box>
        </Grid>
      </Grid>

      <Box sx={styles.footer}>
        <Button
          sx={styles.linkButton}
          component={Link}
          to={APP_ROUTES.PRIVACY_POLICY}
        >
          Privacy Policy
        </Button>

        <Button
          sx={styles.linkButton}
          component={Link}
          to={APP_ROUTES.TERMS_AND_CONDITIONS}
        >
          Terms
        </Button>

        <Button
          sx={styles.linkButton}
          component={Link}
          to={APP_ROUTES.VULNERABILITY_POLICY}
        >
          Vulnerability Policy
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  linkButton: {
    color: "#111928",
    fontSize: {
      xs: "13px",
      sm: "14px",
    },
    fontWeight: "600",
    margin: {
      xs: "0 5px",
      md: "0 20px",
    },
    textTransform: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  footer: {
    display: "flex",
    width: "100%",
    padding: "10px",
    justifyContent: {
      xs: "left",
      sm: "center",
      md: "center",
    },
    textAlign: {
      xs: "left",
      md: "center",
    },
    position: "absolute",
    bottom: 0,
  },
  container: {
    background: {
      xs: "white",
      md: "#fafafa",
    },
    width: "100vw",
    height: "100%",
    display: "flex",
    flexGrow: 1,
    padding: 0,
    paddingRight: 0,
    overflow: "hidden",
  },
  children: {
    background: "#fdfdfd",
    height: "100%",
    marginTop: {
      xs: "10px",
      md: "unset",
    },
    marginBottom: {
      xs: "50px",
      md: 0,
    },
  },
  sideSection: {
    padding: { xs: "20px", sm: "30px" },
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    height: { xs: "100px", md: "unset" },
  },
  smallSignupButton: {
    display: {
      sm: "none",
    },
    color: "#FF5A1F",
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "7px",
    height: "35px",
    width: "100px",
    backgroundColor: "transparent",
    border: "1px solid #FF5A1F",
    "&:hover": {
      background: "rgba(26, 86, 219, 0.04)",
      color: "#FF956B",
      border: "1px solid #FF956B",
    },
  },
  signupButton: {
    color: "#FF5A1F",
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "7px",
    height: "40px",
    width: "120px",
    backgroundColor: "transparent",
    border: "1px solid #FF5A1F",
    position: "absolute",
    top: "30px",
    right: "30px",

    "&:hover": {
      background: "rgba(26, 86, 219, 0.04)",
      color: "#FF956B",
      border: "1px solid #FF956B",
    },
  },
  thirdSection: {
    position: "relative",
    display: {
      xs: "none",
      md: "block",
    },
  },

  imgContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default AuthLayout;
