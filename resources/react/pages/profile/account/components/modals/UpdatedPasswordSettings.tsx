import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  SecondaryOutlinedButton,
  SecondaryContainedButton,
} from "../../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { CustomInput } from "../../../../components/custom-components/Input";

const UpdatedPasswordSettings = () => {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      message.success("New password saved");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error saving password");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await mutateAsync({
    //   ...state,
    // });

    message.success("New password saved");
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
        title="Change Password"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label="Current Password"
            name="password"
            value={state.password}
            autoComplete="current-password"
            type="password"
            required
          />

          <CustomInput
            handleChange={handleChange}
            label="New Password"
            name="newPassword"
            value={state.newPassword}
            autoComplete="new-password"
            type="password"
          />

          <CustomInput
            handleChange={handleChange}
            label="Confirm Password"
            name="confirmPassword"
            value={state.confirmPassword}
            autoComplete="new-password"
            type="password"
          />

          <Box sx={styles.footer}>
            <SecondaryContainedButton
              text="Save"
              styles={{
                width: "100%",
                marginBottom: "20px",
              }}
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

export default UpdatedPasswordSettings;
