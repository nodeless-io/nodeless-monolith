import React, { useState } from "react";
import { Box } from "@mui/material";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginForm from "./components/LoginForm";
import TwoFactorForm from "./components/TwoFactorForm";

const LoginPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <AuthLayout isSignupButtonShown>
      <Box sx={styles.container}>
        {tab == 0 && <LoginForm setTab={setTab} />}
        {tab == 1 && <TwoFactorForm />}
      </Box>
    </AuthLayout>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: {
      xs: "unset",
      md: "center",
    },
    padding: "30px",
    position: "relative",
  },
};

export default LoginPage;
