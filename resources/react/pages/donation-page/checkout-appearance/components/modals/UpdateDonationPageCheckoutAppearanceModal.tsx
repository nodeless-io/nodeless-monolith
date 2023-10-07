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

const UpdateDonationPageCheckoutAppearanceModal = ({ donationPage }: any) => {
  const [open, setOpen] = React.useState(false);
  const { donationPageId } = useParams<{ donationPageId: string }>();
  const [state, setState] = React.useState({
    bg_color: "",
    text_color: "",
    highlight_color: "",
  });

  React.useEffect(() => {
    setState({
      bg_color: donationPage?.settings?.bg_color || "",
      text_color: donationPage?.settings?.text_color || "",
      highlight_color: donationPage?.settings?.highlight_color || "",
    });
  }, [donationPage]);

  const queryClient = useQueryClient();

  const updateDonationPageAppearanceSettings = async (payload) => {
    const response = await useFetch(
      "/donation_page/" + donationPageId,
      payload,
      "PUT"
    );

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(
    updateDonationPageAppearanceSettings,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`donation-page-${donationPageId}`]);
        message.success("Settings updated successfully");
      },
      onError: (error: any) => {
        message.error(
          error?.response?.data?.message || "Error updating settings"
        );
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      ...donationPage,
      settings: {
        text_color: state.text_color,
        highlight_color: state.highlight_color,
        bg_color: state.bg_color,
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

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Edit Checkout Appearance"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ marginBottom: "30px" }}>
            <CustomInput
              handleChange={handleChange}
              label="Background Color"
              name="bg_color"
              value={state.bg_color}
              type="text"
              required
            />
          </Box>

          <Box sx={{ marginBottom: "30px" }}>
            <CustomInput
              handleChange={handleChange}
              label="Text Color"
              name="text_color"
              value={state.text_color}
              type="text"
            />
          </Box>

          <Box sx={{ marginBottom: "30px" }}>
            <CustomInput
              handleChange={handleChange}
              label="Highlight Color"
              name="highlight_color"
              value={state.highlight_color}
              type="text"
            />
          </Box>
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

export default UpdateDonationPageCheckoutAppearanceModal;
