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
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "../../../../app.routes";

const UpdateDonationPageSettingsModal = ({ donationPage }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { donationPageId } = useParams<{ donationPageId: string }>();
  const [state, setState] = React.useState({
    name: donationPage?.name || "",
    slug: donationPage?.slug || "",
    description: donationPage?.description || "",
  });

  React.useEffect(() => {
    setState({
      name: donationPage?.name || "",
      slug: donationPage?.slug || "",
      description: donationPage?.description || "",
    });
  }, [donationPage]);

  const queryClient = useQueryClient();

  const updateDonationPageSettings = async (payload) => {
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

  const { mutateAsync, isLoading } = useMutation(updateDonationPageSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["donation_pages"]);
      message.success("Settings updated successfully");
      navigate(
        `${APP_ROUTES.DONATIONS}/settings/${donationPageId}/${state.slug}`
      );
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
        bg_color: "#FFFFFF",
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
        title="Edit Donation Page"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label="Donation Page Title"
            name="name"
            value={state.name}
            autoComplete="name"
            type="text"
            required
          />

          <CustomInput
            handleChange={handleChange}
            label="Slug"
            name="slug"
            value={state.slug}
            type="text"
          />

          <CustomInput
            handleChange={handleChange}
            label="Description"
            name="description"
            value={state.description}
            multiline
            rows={4}
            type="description"
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
    marginTop: "30px",
    padding: "10px",
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

export default UpdateDonationPageSettingsModal;
