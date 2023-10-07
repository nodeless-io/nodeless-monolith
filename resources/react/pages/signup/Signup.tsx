import React, { useState } from "react";
import { Box, Typography, Button, FormControlLabel } from "@mui/material";
import AuthLayout from "../components/layouts/AuthLayout";
import { CustomInput } from "../components/custom-components/Input";
import { SecondaryContainedButton } from "../components/custom-components/Button";
import { APP_ROUTES } from "../app.routes";
import axios from "axios";
import Checkbox from "../components/custom-components/Checkbox";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";
import { Link, useNavigate } from "react-router-dom";
import { isEmailNodelessAddress } from "../../utils/helpers";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { message } from "antd";

const SignupPage = () => {
  const navigate = useNavigate();

  let csrf =
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content") || "";

  const [state, setState] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    error: "",
    key: "",
    loading: false,
    isAlertOpen: false,
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const checkIsError = (name: string): boolean =>
    state.key === name && !!state.error;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(state.email).valid) {
      message.error(validateEmail(state.email).message);
    } else if (!validatePassword(state.password).valid) {
      message.error(validateEmail(state.password).message);
    } else if (
      !validateConfirmPassword(state.password, state.password_confirmation)
        .valid
    ) {
      message.error(
        validateConfirmPassword(state.password, state.password_confirmation)
          .message
      );
    } else if (isEmailNodelessAddress(state.email)) {
      message.error("This domain is not allowed");
    } else {
      try {
        await axios.post(
          "/register",
          {
            email: state.email,
            password: state.password,
            password_confirmation: state.password_confirmation,
          },
          {
            headers: {
              "X-CSRF-TOKEN": csrf,
              Accept: "application/json",
            },
          }
        );

        window.location.href = APP_ROUTES.DASHBOARD;
      } catch (error) {
        const status = error?.response?.status;
        message.error(
          error?.response?.data?.message || "Error creating account"
        );

        if (status == 400) {
          setTimeout(() => {
            window.location.href = APP_ROUTES.DASHBOARD;
          }, 1000);
        }
      }
    }
  };

  return (
    <AuthLayout>
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Typography sx={styles.header}>Sign up</Typography>
          <Typography sx={styles.subHeader}>Let’s get you started</Typography>

          <Box
            sx={styles.formContainer}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <CustomInput
              handleChange={handleChange}
              label="Email"
              name="email"
              value={state.email}
              autoComplete="email"
              placeholder="Email"
              error={checkIsError("email")}
              type="email"
              required
            />

            <CustomInput
              handleChange={handleChange}
              label="Password"
              name="password"
              value={state.password}
              type="password"
              placeholder="Password"
              error={checkIsError("password")}
              required
            />

            <CustomInput
              handleChange={handleChange}
              label="Confirm Password"
              name="password_confirmation"
              value={state.password_confirmation}
              type="password"
              placeholder="Confirm Password"
              error={checkIsError("password_confirmation")}
              required
            />

            <FormControlLabel
              control={<Checkbox size="small" color="secondary" required />}
              label={
                <Typography sx={styles.termsText}>
                  I agree to the{" "}
                  <span
                    className="terms"
                    role="button"
                    onClick={() => navigate(APP_ROUTES.TERMS_AND_CONDITIONS)}
                  >
                    terms and conditions
                  </span>
                </Typography>
              }
            />

            <Box sx={styles.footer}>
              <SecondaryContainedButton
                type="submit"
                text="Sign Up"
                loading={state.loading}
                styles={styles.button}
              />
            </Box>

            <Box sx={styles.links}>
              <Button
                component={Link}
                sx={styles.linkText}
                to={APP_ROUTES.LOGIN}
                startIcon={<NavigateBeforeIcon />}
              >
                Already Registered? Login here
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

const styles = {
  button: {
    width: "100%",
  },
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
  content: {
    width: "100%",
  },
  header: {
    color: "#1F2A37",
    fontWeight: "600",
    fontSize: "30px",
  },
  subHeader: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: "14px",
  },
  formContainer: {
    marginTop: "50px",
  },
  footer: {
    marginTop: "15px",
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
  termsText: {
    color: "#374151",
    fontSize: "14px",
    fontWeight: "400",
  },
};

export default SignupPage;
