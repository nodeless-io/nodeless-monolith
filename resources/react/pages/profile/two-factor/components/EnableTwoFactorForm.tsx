import React from "react";
import { Box, Typography, Paper, Divider, TextField } from "@mui/material";
import classes from "./styles.module.css";
import { styled } from "@mui/material/styles";
import { message } from "antd";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import { UserContext } from "../../../../contexts/user/UserContext";
import { useFetch } from "../../../../hooks/useFetch";
import { useMutation, useQueryClient } from "react-query";
import AuthCode from "react-auth-code-input";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F7F7F7",
  padding: "30px",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "#fff",
    padding: "20px",
  },
}));

const EnableTwoFactorForm = () => {
  const queryClient = useQueryClient();
  const [verificationCode, setVerificationCode] = React.useState("");

  const handleOnChange = (res: string) => {
    setVerificationCode(res);
  };

  const { twoFactorDetails } = React.useContext(UserContext);

  const verifyTwoFactor = async (payload) => {
    await useFetch(`/2fa/enable`, payload, "POST");
  };

  const { isLoading: formLoading, mutateAsync } = useMutation(verifyTwoFactor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      message.success("2FA enabled successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error enabling 2FA");
    },
  });

  const handleAccountDetailsSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      code: verificationCode,
      secret: twoFactorDetails?.secret,
    });
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleAccountDetailsSubmit}
    >
      <Item elevation={0}>
        <Typography sx={styles.label}>
          Setup Two-Factor Authentication
        </Typography>

        <Typography
          sx={{
            color: "#4B5563",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Please scan the code below with the two-factor authentication app on
          your phone.
        </Typography>

        <div>
          <img
            src={twoFactorDetails?.qrCode}
            width={250}
            height={250}
            alt="Lightning QR Code"
            className="mx-auto"
          />
        </div>

        <Typography
          sx={{
            color: "#4B5563",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            marginBottom: "10px",
            marginTop: "30px",
          }}
        >
          If you are unable to scan, use this code instead
        </Typography>

        <Typography
          sx={{
            color: "#FF7847",
            fontSize: {
              xs: "14px",
              md: "15px",
            },
            fontWeight: "600",
          }}
        >
          {twoFactorDetails?.secret}
        </Typography>

        <Divider sx={{ margin: "20px 0" }} />

        <Typography sx={styles.label}>Verify App</Typography>

        <Typography
          sx={{
            color: "#4B5563",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Enter the code in the confirmation box below from your two-factor
          authentication app
        </Typography>

        <Box sx={styles.formItem}>
          <AuthCode
            onChange={handleOnChange}
            allowedCharacters="numeric"
            inputClassName="two-factor-code-input"
          />
        </Box>

        <Divider sx={{ margin: "20px 0" }} />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            text="Verify"
            disabled={formLoading}
            loading={formLoading}
            styles={{ width: "100%" }}
          />
        </Box>
      </Item>
    </Box>
  );
};

const styles = {
  formItem: {
    margin: {
      xs: "40px 0",
      md: "25px 0",
    },
    width: "auto",
    textAlign: {
      xs: "center",
      md: "unset",
    },
  },
  footer: {
    width: {
      xs: "100%",
      md: "200px",
    },
    marginLeft: "auto",
    marginRight: 0,
  },
  textFieldLabel: {
    color: "#6B7280",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  textfield: {
    color: "#6B7280",
    fontSize: "14px",
    borderRadius: "8px",
  },

  gridContainer: {
    position: "relative",
    marginBottom: "40px",
  },
  settingsLabel: {
    display: {
      xs: "none",
      md: "block",
    },
  },

  label: {
    color: "#9CA3AF",
    marginBottom: "15px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: {
      xs: "center",
      md: "unset",
    },
  },

  container: {
    marginTop: {
      xs: "10px",
      sm: "40px",
    },
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "30px",
  },
};

export default EnableTwoFactorForm;
