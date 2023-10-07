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
import {
  CustomInput,
  CustomInputWithEndAdornment,
} from "../../../../components/custom-components/Input";
import { useParams } from "react-router-dom";
import { NodelessAddressContext } from "../../../../../contexts/nodeless-address/NodelessAddressContext";
import generateNostrHexPub from "../../../../../utils/hexPubGenerator";

const UpdateEmailSettingsModal = () => {
  const [open, setOpen] = React.useState(false);
  const { addressId } = useParams();
  const { nodelessAddress } = React.useContext(NodelessAddressContext);
  const queryClient = useQueryClient();

  const [nodelessAddressData, setNodelessAddressData] = React.useState({
    username: "",
    price: 0,
    email: "",
    nostr_npub: "",
    nostr_hexpub: "",
  });

  React.useEffect(() => {
    setNodelessAddressData({
      username: nodelessAddress?.username,
      email: nodelessAddress?.email,
      price: nodelessAddress?.price,
      nostr_npub: nodelessAddress?.nostr_npub,
      nostr_hexpub: nodelessAddress?.nostr_hexpub,
    });
  }, [nodelessAddress]);

  const updateEmailSettings = async (payload) => {
    const response = await useFetch("/inbox/" + addressId, payload, "PUT");

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setNodelessAddressData({
      ...nodelessAddressData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateEmailSettings, {
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
    let nostr_hexpub;

    try {
      nostr_hexpub = generateNostrHexPub(nodelessAddressData.nostr_npub);
    } catch (error) {
      return;
    }

    await mutateAsync({
      ...nodelessAddress,
      username: nodelessAddressData.username,
      email: nodelessAddressData.email,
      price: nodelessAddressData.price,
      nostr_npub: nodelessAddressData.nostr_npub,
      nostr_hexpub,
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
        title="Edit Email Settings"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInputWithEndAdornment
            handleChange={handleChange}
            label="Username"
            name="username"
            value={nodelessAddressData.username}
            autoComplete="name"
            type="text"
            required
            endAdornment={
              <Typography
                sx={{ color: "#D1D5DB", fontSize: "14px", fontWeight: "600" }}
              >
                @nodeless.io
              </Typography>
            }
          />

          <CustomInput
            handleChange={handleChange}
            label="Forward Emails to"
            name="email"
            value={nodelessAddressData.email}
            type="email"
          />

          <CustomInputWithEndAdornment
            handleChange={handleChange}
            label="Set Email Paywall Fee"
            name="price"
            value={nodelessAddressData.price}
            type="number"
            min="1000"
            endAdornment={
              <Typography
                sx={{
                  color: "#9CA3AF",
                  fontSize: {
                    xs: "14px",
                    md: "16px",
                  },
                  fontWeight: "600",
                }}
              >
                SATS
              </Typography>
            }
          />

          <CustomInput
            handleChange={handleChange}
            label="Nostr Npub (Optional)"
            name="nostr_npub"
            value={nodelessAddressData.nostr_npub}
            type="text"
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

export default UpdateEmailSettingsModal;
