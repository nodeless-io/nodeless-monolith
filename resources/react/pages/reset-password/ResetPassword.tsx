import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Logo from "../components/logo/Logo";
import { APP_ROUTES } from "../app.routes";
import { CustomInput } from "../components/custom-components/Input";
import { SecondaryContainedButton } from "../components/custom-components/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useFetch } from "../../hooks/useFetch";
import { useMutation } from "react-query";
import { message } from "antd";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { checkAuthStatus } from "../../hooks/useAuth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const isLogged = checkAuthStatus();

  React.useEffect(() => {
    if (isLogged) {
      navigate(APP_ROUTES.DASHBOARD);
    }
  }, [isLogged]);

  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const email = searchParams.get("email");

  const resetPassword = async (payload) => {
    return await useFetch(`/reset-password`, payload, "POST");
  };

  const { isLoading, mutateAsync } = useMutation(resetPassword, {
    onSuccess: () => {
      message.success("Password reset successfully");
      navigate(APP_ROUTES.LOGIN);
    },
    onError: (error: any) => {
      message.error("Error resetting password");
    },
  });

  React.useEffect(() => {
    if (!email) {
      navigate(APP_ROUTES.FORGOT_PASSWORD);
    }
  }, [email]);

  const [state, setState] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...state,
      email,
      token,
    };

    if (state.password != state.password_confirmation) {
      message.error("Passwords must match");
      return;
    }

    await mutateAsync(payload);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Logo />

        <Button
          sx={styles.signupButton}
          variant="outlined"
          component={Link}
          to={APP_ROUTES.SIGNUP}
        >
          Sign Up
        </Button>
      </Box>

      <Box sx={styles.content}>
        <Box sx={{ width: "100%" }}>
          <Box sx={styles.subHeader}>
            <Typography sx={styles.headerText}>Reset Password</Typography>

            <Typography sx={styles.subHeaderText}>
              Please enter your new password
            </Typography>
          </Box>

          <Box
            sx={styles.formContainer}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <CustomInput
              handleChange={handleChange}
              label="Password"
              name="password"
              value={state.password}
              autoFocus
              placeholder="Password"
              type="password"
              required
            />

            <CustomInput
              handleChange={handleChange}
              label="Confirm Password"
              name="password_confirmation"
              value={state.password_confirmation}
              placeholder="Confirm Password"
              type="password"
              required
            />

            <Box sx={styles.footer}>
              <SecondaryContainedButton
                type="submit"
                text="Submit"
                loading={isLoading}
                styles={styles.button}
                disabled={isLoading}
              />
            </Box>

            <Box sx={styles.links}>
              <Button
                component={Link}
                sx={styles.linkText}
                to={APP_ROUTES.LOGIN}
                startIcon={<NavigateBeforeIcon />}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    background: "#fafafa",
    width: "100vw",
    height: "100vh",
    padding: {
      xs: "20px",
      md: "30px",
    },
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  signupButton: {
    color: "#FF5A1F",
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "7px",
    height: "40px",
    width: {
      xs: "100px",
      md: "120px",
    },
    backgroundColor: "transparent",
    border: "1px solid #FF5A1F",
    "&:hover": {
      background: "rgba(26, 86, 219, 0.04)",
      color: "#FF956B",
      border: "1px solid #FF956B",
    },
  },
  content: {
    display: {
      xs: "block",
      md: "flex",
    },
    alignItems: {
      xs: "unset",
      md: "center",
    },
    height: {
      xs: "unset",
      md: "calc(100vh - 150px)",
    },
    width: {
      xs: "100%",
      md: "400px",
    },
    justifyContent: {
      xs: "unset",
      md: "center",
    },
    margin: "auto",
    marginTop: {
      xs: "100px",
      md: "unset",
    },
  },
  subHeader: {
    textAlign: {
      xs: "left",
      md: "center",
    },
  },
  headerText: {
    color: "#1F2A37",
    fontWeight: "600",
    fontSize: "30px",
    marginBottom: "10px",
  },
  subHeaderText: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: "14px",
  },
  formContainer: {
    marginTop: "50px",
  },
  button: {
    width: "100%",
  },
  footer: {
    marginTop: "40px",
    width: {
      xs: "100%",
      md: "unset",
    },
  },
  links: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    textAlign: "center",
  },
  linkText: {
    color: "#4B5563",
    fontSize: "15px",
    textTransform: "none",
    textDecoration: "underline",
    "&:hover": {
      textTransform: "none",
      textDecoration: "underline",
    },
  },
};

export default ResetPasswordPage;
