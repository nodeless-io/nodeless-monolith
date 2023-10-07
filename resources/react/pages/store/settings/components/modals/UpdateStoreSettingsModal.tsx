import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  SecondaryContainedButton,
  SecondaryOutlinedButton,
} from "../../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { CustomInput } from "../../../../components/custom-components/Input";
import { useParams } from "react-router-dom";

const UpdateStoreSettingsModal = ({ store }: any) => {
  const [open, setOpen] = React.useState(false);
  const { storeId } = useParams<{ storeId: string }>();
  const [state, setState] = React.useState({
    name: store?.name || "",
    url: store?.url || "",
    email: store?.email || "",
  });

  React.useEffect(() => {
    setState({
      name: store?.name || "",
      url: store?.url || "",
      email: store?.email || "",
    });
  }, [store]);

  const queryClient = useQueryClient();

  const updateStoreSettings = async (payload) => {
    const response = await useFetch("/stores/" + storeId, payload, "PUT");

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateStoreSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      message.success("Settings updated successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error updating settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      ...state,
      settings: {
        text_color: store?.settings.text_color,
        highlight_color: store?.settings.highlight_color,
        bg_color: store?.settings.bg_color,
      },
    });
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

      <Modal handleClose={() => setOpen(false)} open={open} title="Edit Store">
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label="Store Name"
            name="name"
            value={state.name}
            autoComplete="name"
            type="text"
            required
          />

          <CustomInput
            handleChange={handleChange}
            label="Store Website"
            name="url"
            value={state.url}
            type="url"
          />

          <CustomInput
            handleChange={handleChange}
            label="Store Email"
            name="email"
            value={state.email}
            autoComplete="email"
            type="email"
          />

          <Box sx={styles.footer}>
            <SecondaryContainedButton
              text="Save"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              styles={styles.saveButton}
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
    marginTop: "15px",
    width: "100%",
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
    width: "100%",
  },
  saveButton: {
    height: "40px",
    marginBottom: "15px",
    width: "100%",
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

export default UpdateStoreSettingsModal;
