import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { StoreContext } from "../../../../../contexts/store/StoreContext";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { IStoreNewInvoice } from "../../../../../types/stores.interface";
import { CustomInput } from "../../../../components/custom-components/Input";
import { SecondaryContainedButton } from "../../../../components/custom-components/Button";
import { useParams } from "react-router-dom";

const CreateStoreInvoiceModal = ({}) => {
  const { setCreateInvoiceModalOpen, createInvoiceModalOpen } = useContext(
    StoreContext
  );
  const queryClient = useQueryClient();
  const { storeId } = useParams();

  const initialState = {
    email: "",
    amount: "",
    url: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addInvoice = async (payload: IStoreNewInvoice) => {
    const response = await useFetch(
      `/stores/${storeId}/invoices`,
      payload,
      "POST"
    );

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(addInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices" + storeId, 1]);
      setCreateInvoiceModalOpen(false);
      message.success("Invoice created successfully");
      setState(initialState);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating invoice");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await mutateAsync({
      amount: `${state.amount}`,
      redirect_url: state.url,
      buyer_email: state.email,
      currency: "SATS",
    });
  };

  return (
    <Modal
      handleClose={() => setCreateInvoiceModalOpen(false)}
      open={createInvoiceModalOpen}
      title="Create an Invoice"
    >
      <Box
        sx={styles.formContainer}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <CustomInput
          handleChange={handleChange}
          label="Amount"
          name="amount"
          value={state.amount}
          type="number"
          required
          autoFocus
          min="1000"
        />

        <CustomInput
          handleChange={handleChange}
          label="Buyer Email (optional)"
          name="email"
          value={state.email}
          autoComplete="email"
          placeholder="Email"
          type="email"
        />

        <CustomInput
          handleChange={handleChange}
          label="Redirect URL (Optional)"
          name="url"
          value={state.url}
          autoComplete="url"
          placeholder="URL (optional)"
          type="url"
        />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            type="submit"
            text="Create Invoice"
            loading={isLoading}
            styles={{ width: "100%" }}
          />

          <Button
            variant="text"
            sx={styles.cancel}
            onClick={() => setCreateInvoiceModalOpen(false)}
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
    marginTop: "50px",
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

export default CreateStoreInvoiceModal;
