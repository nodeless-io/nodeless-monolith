import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputBase,
} from "@mui/material";
import Modal from "../../../components/custom-components/Modal";
import { ErrorButton } from "../../../components/custom-components/Button";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { styled, alpha } from "@mui/material/styles";
import AuthCode from "react-auth-code-input";
import { UserContext } from "../../../../contexts/user/UserContext";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #D1D5DB;",
    fontSize: "14px",
    width: "100%",
    padding: "10px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "30px",
    marginBottom: "10px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#FF956B",
    },
  },
}));

const DisableTwoFactorModal = () => {
  const { disable2faModalOpen, setDisable2faModalOpen } = React.useContext(
    UserContext
  );

  const queryClient = useQueryClient();

  const disableTwoFactor = async (payload) => {
    await useFetch(`/2fa/disable`, payload, "POST");
  };

  const [verificationCode, setVerificationCode] = useState("");

  const handleOnChange = (res: string) => {
    setVerificationCode(res);
  };

  const { isLoading, mutateAsync } = useMutation(disableTwoFactor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setDisable2faModalOpen(false);
      message.success("2FA disabled successfully");
      window.location.reload();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error disabling 2FA");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      code: verificationCode,
    });

    setDisable2faModalOpen(false);
  };

  return (
    <Box>
      <Modal
        handleClose={() => setDisable2faModalOpen(false)}
        open={disable2faModalOpen}
        title="Disable 2FA"
      >
        <Typography sx={styles.text}>
          Disabling 2FA does not change the keys used in the authenticator apps.
          If you wish to change the key used in an authenticator app you should
          reset your authenticator keys.
        </Typography>

        <Divider />

        <FormControl
          variant="standard"
          sx={{ width: "100%", marginTop: "20px" }}
        >
          <Typography sx={styles.textFieldLabel}>
            Please enter your verification code
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            <AuthCode
              onChange={handleOnChange}
              allowedCharacters="numeric"
              inputClassName="code-input"
            />
          </Box>
        </FormControl>

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <ErrorButton
            text="Disable"
            styles={styles.button}
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
          />
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  deleteButton: {
    color: "#E02424",
    textTransform: "none",
    textDecoration: "underline",
    marginLeft: {
      xs: "50px",
      md: "unset",
    },
    marginTop: {
      xs: "20px",
      md: "unset",
    },
  },
  text: {
    marginBottom: "30px",
    color: "#9CA3AF",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    lineHeight: "160%",
  },
  button: {
    width: "120px",
    margin: "auto",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "15px",
    color: "#4B5563",
  },
};

export default DisableTwoFactorModal;
