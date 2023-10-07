import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CustomInput } from "../../components/custom-components/Input";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../app.routes";
import { message } from "antd";
import { useFetch } from "../../../hooks/useFetch";
import { useMutation } from "react-query";

const LoginForm = ({ setTab }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { isLoading, mutateAsync } = useMutation(
    async (payload: any) => {
      const response = await useFetch("/login", payload, "POST");

      return response;
    },
    {
      onSuccess: () => {
        message.success("Login successful");

        window.location.href = APP_ROUTES.DASHBOARD;
      },
      onError: (error: any) => {
        const status = error?.response?.status;

        if (status == 400) {
          message.error("You are already logged in");
          window.location.href = APP_ROUTES.DASHBOARD;
        } else if (status == 401) {
          setTab(1);
        } else {
          message.error("Wrong credentials");
        }
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateAsync(state);
  };

  return (
    <Box sx={styles.content}>
      <Typography sx={styles.header}>Hello,</Typography>
      <Typography sx={styles.subHeader}>Login to continue</Typography>

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
          required
        />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            type="submit"
            text="Log In"
            loading={isLoading}
            styles={styles.button}
          />
        </Box>

        <Box sx={styles.links}>
          <Box>
            <Typography
              component={Link}
              sx={styles.linkText}
              to={APP_ROUTES.SIGNUP}
            >
              Sign up here
            </Typography>
          </Box>

          <Box>
            <Typography
              component={Link}
              sx={styles.linkText}
              to={APP_ROUTES.FORGOT_PASSWORD}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  button: {
    width: "100%",
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
    marginTop: "40px",
    width: {
      xs: "100%",
      md: "unset",
    },
  },
  links: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  linkText: {
    color: "#4B5563",
    fontSize: "15px",
    textDecoration: "underline",
  },
};

export default LoginForm;
