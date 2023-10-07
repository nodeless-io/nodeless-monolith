import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryOutlinedButton } from "../../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { CustomInput } from "../../../../components/custom-components/Input";

import { UserContext } from "../../../../../contexts/user/UserContext";

const UpdateAccountSettingsModal = () => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    username: "",
    email: "",
  });

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    setState({
      username: user?.email || "",
      email: user?.email || "",
    });
  }, [user]);

  const queryClient = useQueryClient();

  const updateAccountSettings = async (payload) => {
    const response = await useFetch("/", payload, "PUT");

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateAccountSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      message.success("Account updated successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error updating account");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await mutateAsync({
    //   ...state,
    // });

    message.success("Account updated successfully");
  };

  return (
    <Box>
      <IconButton
        sx={styles.editIcon}
        size="small"
        onClick={() => setOpen(true)}
      >
        <DriveFileRenameOutlineIcon fontSize="small" />
        <Typography
          sx={{ marginLeft: "10px", fontSize: "13px", fontWeight: "600" }}
        >
          Edit
        </Typography>
      </IconButton>

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Edit Account Details"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label="Username"
            name="username"
            value={state.username}
            autoComplete="username"
            type="text"
            required
          />

          <CustomInput
            handleChange={handleChange}
            label="Email"
            name="email"
            value={state.email}
            autoComplete="email"
            type="email"
          />

          <Box sx={styles.footer}>
            <SecondaryOutlinedButton
              text="Send verification email"
              styles={{
                width: "100%",
                color: "#4B5563",
                border: "1px solid #4B5563",
                "&:hover": {
                  background: "#4B5563",
                  color: "white",
                },
                marginBottom: "20px",
              }}
              onClick={() => message.success("Verification email sent")}
              loading={isLoading}
            />

            <SecondaryOutlinedButton
              text="Cancel"
              onClick={() => setOpen(false)}
              styles={styles.cancelButton}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  formContainer: {
    marginTop: "10px",
  },

  footer: {
    marginTop: "50px",
  },
  checkboxLabel: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "600",
  },
  cancelButton: {
    height: "40px",
    color: "#4B5563",
    border: "unset",
    textDecoration: "underline",
  },
  saveButton: {
    height: "40px",
    marginBottom: "15px",
  },
  editIcon: {
    color: "#FF5A1F",
    display: {
      md: "none",
    },
    "&:hover": {
      background: "transparent",
      color: "#FF5A1F",
    },
  },
};

export default UpdateAccountSettingsModal;
