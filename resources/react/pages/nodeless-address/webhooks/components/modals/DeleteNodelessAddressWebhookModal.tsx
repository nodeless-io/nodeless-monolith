import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import {
  SecondaryOutlinedButton,
  ErrorButton,
} from "../../../../components/custom-components/Button";

const DeleteNodelessAddressWebhookModal = ({ uuid }: any) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteWebhook = async ({ uuid }) => {
    await useFetch(`/bitcoinable_webhook/uuid/${uuid}`, null, "DELETE");
  };

  const { isLoading, mutateAsync } = useMutation(deleteWebhook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["nodeless-address-webhooks"]);
      setOpen(false);
      message.success("Web hook deleted successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error deleting webhooks"
      );
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await mutateAsync({
      uuid,
    });
  };

  return (
    <Box>
      <IconButton
        sx={styles.closeButton}
        onClick={() => setOpen(true)}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Delete Webhook"
      >
        <Box sx={styles.buttons}>
          <SecondaryOutlinedButton
            text="No, Cancel"
            styles={styles.noButton}
            onClick={() => setOpen(false)}
          />

          <ErrorButton
            text="Yes, Delete it"
            styles={styles.yesButton}
            onClick={handleDelete}
            disabled={isLoading}
          />
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  closeButton: {
    border: "1px solid #E6E8EA",
    borderRadius: "8px",
    color: "#D92D20",
    "&:hover": {
      background: "#FEE4E2",
      border: "1px solid #FEE4E2",
      color: "#D92D20",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "50px",
  },
  noButton: {
    height: "40px",
    marginRight: "10px",
  },
  yesButton: {
    height: "40px",
    marginLeft: "10px",
  },
};

export default DeleteNodelessAddressWebhookModal;
