import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Modal from "../../../components/custom-components/Modal";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import {
  SecondaryOutlinedButton,
  ErrorButton,
} from "../../../components/custom-components/Button";

const DeleteAPITokenModal = ({ uuid }: any) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteAPIToken = async () => {
    await useFetch(`/user/api-tokens/${uuid}`, null, "DELETE");
  };

  const { isLoading, mutateAsync } = useMutation(deleteAPIToken, {
    onSuccess: () => {
      queryClient.invalidateQueries(["api-tokens"]);
      setOpen(false);
      message.success("API token deleted successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error deleting API token"
      );
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <Box>
      <IconButton
        sx={styles.closeButton}
        onClick={() => setOpen(true)}
        size="small"
      >
        <CloseIcon fontSize="small" sx={{ color: "#D92D20" }} />
      </IconButton>

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Delete API Token"
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

export default DeleteAPITokenModal;
