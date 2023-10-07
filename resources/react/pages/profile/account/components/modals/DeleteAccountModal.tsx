import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  InputLabel,
  FormControl,
} from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { ErrorButton } from "../../../../components/custom-components/Button";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { APP_ROUTES } from "../../../../app.routes";
import { BootstrapInput } from "../AccountSettingsContent";

const DeleteAccountModal = ({ uuid }: any) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteAccount = async () => {
    await useFetch(`/`, null, "DELETE");
  };

  const [password, setPassword] = useState("");

  const { isLoading, mutateAsync } = useMutation(deleteAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setOpen(false);
      message.success("Account deleted successfully");
      setTimeout(() => {
        window.location.href = APP_ROUTES.LOGIN;
      }, 1000);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error deleting account");
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    // await mutateAsync({
    //   uuid,
    // });
    message.success("Account deleted successfully");
    setOpen(false);
  };

  return (
    <Box>
      <ErrorButton
        text="Delete Account"
        styles={{
          width: "200px",
          color: "#E02424",
          background: "white",
          border: "1px solid #F98080",
        }}
        onClick={() => setOpen(true)}
      />

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Delete Account"
      >
        <Typography sx={styles.text}>
          You are about to delete your account.
          <br />
          If this is because of poor services, you can send us an email at
          <a
            href="mailto:service@nodeless.io"
            target="_blank"
            referrerPolicy="no-referrer"
            style={{
              marginLeft: "3px",
              color: "#FF7847",
            }}
          >
            service@nodeless.io
          </a>
          . We would be glad to hear from you.
        </Typography>

        <Divider />

        <FormControl
          variant="standard"
          sx={{ width: "100%", marginTop: "20px" }}
        >
          <InputLabel
            shrink
            //@ts-ignore
            color="gray"
            sx={styles.textFieldLabel}
          >
            Please enter your login password to continue
          </InputLabel>

          <BootstrapInput
            name="password"
            required
            fullWidth
            size="small"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="Login Password"
            autoComplete="current-password"
          />
        </FormControl>

        <Divider />

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <ErrorButton
            text="Delete"
            styles={styles.button}
            onClick={handleDelete}
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
    fontSize: "14px",
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
    fontSize: "16px",
    color: "#4B5563",
  },
};

export default DeleteAccountModal;
