import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import Modal from "../../components/custom-components/Modal";
import { StoreContext } from "../../../contexts/store/StoreContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { IStore } from "../../../types/stores.interface";
import { CustomInput } from "../../components/custom-components/Input";
import { SecondaryContainedButton } from "../../components/custom-components/Button";

const CreateStoreModal = ({}) => {
  const { setCreateStoreModalOpen, createStoreModalOpen } = useContext(
    StoreContext
  );
  const queryClient = useQueryClient();

  const initialState = {
    email: "",
    storeName: "",
    url: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const createStore = async (payload: Partial<IStore>) => {
    const response = await useFetch("/stores", payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createStore, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      setCreateStoreModalOpen(false);
      message.success("Store created successfully");
      setState(initialState);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating store");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let payload = {
      name: state.storeName,
      url: state.url,
      email: state.email,
      settings: {
        bg_color: "#ffffff",
        text_color: "#000000",
        highlight_color: "#FF0000",
      },
    };

    await mutateAsync(payload);
  };

  return (
    <Modal
      handleClose={() => setCreateStoreModalOpen(false)}
      open={createStoreModalOpen}
      title="Add store"
    >
      <Box
        sx={styles.formContainer}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <CustomInput
          handleChange={handleChange}
          label="Store Name"
          name="storeName"
          value={state.storeName}
          autoComplete="name"
          placeholder="Store Name"
          type="text"
          required
        />

        <CustomInput
          handleChange={handleChange}
          label="URL (Optional)"
          name="url"
          value={state.url}
          autoComplete="url"
          placeholder="URL (optional)"
          type="url"
        />

        <CustomInput
          handleChange={handleChange}
          label="Email (Optional)"
          name="email"
          value={state.email}
          autoComplete="email"
          placeholder="Email"
          type="email"
        />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            type="submit"
            text="Add Store"
            loading={isLoading}
            styles={{ width: "100%" }}
          />

          <Button
            variant="text"
            sx={styles.cancel}
            onClick={() => setCreateStoreModalOpen(false)}
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

export default CreateStoreModal;
