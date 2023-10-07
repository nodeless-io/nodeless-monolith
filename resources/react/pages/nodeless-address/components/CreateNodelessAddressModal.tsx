import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Modal from "../../components/custom-components/Modal";
import { NodelessAddressContext } from "../../../contexts/nodeless-address/NodelessAddressContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  CustomInput,
  CustomInputWithEndAdornment,
} from "../../components/custom-components/Input";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import generateNostrHexPub from "../../../utils/hexPubGenerator";

const CreateNodelessAddressModal = ({}) => {
  const {
    setCreateNodelessAddressModal,
    createNodelessAddressModal,
  } = useContext(NodelessAddressContext);
  const queryClient = useQueryClient();

  const initialState = {
    email: "",
    username: "",
    price: "",
    body: "",
    subject: "",
    nostr_npub: "",
    nostr_hexpub: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const createNodelessAddress = async (payload) => {
    const response = await useFetch(`/inbox`, payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createNodelessAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["nodeless-address"]);
      setState(initialState);

      setCreateNodelessAddressModal(false);
      message.success("Nodeless Address created successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error creating nodeless address"
      );
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let nostr_hexpub;

    if (state.nostr_npub) {
      const hexpub = generateNostrHexPub(state.nostr_npub);

      if (!hexpub) {
        return message.error("Invalid Nostr key");
      }

      nostr_hexpub = hexpub;
    }

    const payload = {
      username: state.username,
      email: state.email,
      price: Number(state.price),
      nostr_npub: state.nostr_npub,
      nostr_hexpub,
      settings: {
        body: state.body,
        subject: state.subject,
      },
    };

    await mutateAsync(payload);
  };

  return (
    <Modal
      handleClose={() => setCreateNodelessAddressModal(false)}
      open={createNodelessAddressModal}
      title="New Address"
    >
      <Box
        sx={styles.formContainer}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <CustomInputWithEndAdornment
          handleChange={handleChange}
          label="Username"
          name="username"
          value={state.username}
          autoComplete="username"
          type="text"
          required
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
              @nodeless.io
            </Typography>
          }
        />

        <CustomInput
          handleChange={handleChange}
          label="Forward Emails to"
          name="email"
          value={state.email}
          type="email"
        />

        <CustomInputWithEndAdornment
          handleChange={handleChange}
          label="Set Email Paywall Fee"
          name="price"
          value={state.price}
          type="number"
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
          label="Nostr Npub (optional)"
          name="nostr_npub"
          value={state.nostr_npub}
          type="text"
          minLength="8"
        />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            type="submit"
            text="Add Address"
            loading={isLoading}
            styles={{ width: "100%" }}
          />

          <Button
            variant="text"
            sx={styles.cancel}
            onClick={() => setCreateNodelessAddressModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  formContainer: {
    marginTop: "10px",
    padding: "10px 15px",
  },
  footer: {
    marginTop: "60px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#1F2A37",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
  },
  paperProps: {
    borderRadius: "12px",
    padding: "10px",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    color: "#374151",
  },
  content: {
    marginTop: "20px",
  },
  cancel: {
    width: "100%",
    marginTop: "20px",
    color: "#4B5563",
    fontSize: "14px",
    textDecoration: "underline",
    fontWeight: "600",
    textTransform: "none",
    height: "45px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default CreateNodelessAddressModal;
