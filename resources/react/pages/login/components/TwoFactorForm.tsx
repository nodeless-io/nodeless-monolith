import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { APP_ROUTES } from "../../app.routes";
import { message } from "antd";
import { useFetch } from "../../../hooks/useFetch";
import { useMutation } from "react-query";
import AuthCode from "react-auth-code-input";

const TwoFactorForm = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleOnChange = (res: string) => {
    setVerificationCode(res);
  };

  const { isLoading, mutateAsync } = useMutation(
    async (payload: any) => {
      const response = await useFetch("/2fa/verify", payload, "POST");

      return response;
    },
    {
      onSuccess: (data) => {
        message.success("Login successful");

        window.location.href = APP_ROUTES.DASHBOARD;
      },
      onError: (error: any) => {
        const status = error?.response?.status;

        message.error(error?.response?.data?.message || "Invalid credentials");
        if (status == 400) {
          window.location.href = APP_ROUTES.DASHBOARD;
        } else if (status == 401) {
        }
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateAsync({ secret: `${verificationCode}` });
  };

  return (
    <Box sx={styles.content}>
      <Typography sx={styles.header}>2fa</Typography>
      <Typography sx={styles.subHeader}>
        Please enter the code in your authentication app
      </Typography>

      <Box
        sx={styles.formContainer}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box>
          <AuthCode
            onChange={handleOnChange}
            allowedCharacters="numeric"
            inputClassName="code-input"
          />
        </Box>

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            type="submit"
            text="Verify and Log In"
            loading={isLoading}
            styles={styles.button}
            disabled={
              !verificationCode || isLoading || verificationCode.length < 6
            }
          />
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
    marginTop: "45px",
    width: {
      xs: "100%",
      md: "unset",
    },
    maxWidth: "300px",
  },
};

export default TwoFactorForm;
