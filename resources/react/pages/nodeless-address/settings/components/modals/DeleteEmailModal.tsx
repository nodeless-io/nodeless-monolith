import React, { useState } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { ErrorButton } from "../../../../components/custom-components/Button";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { APP_ROUTES } from "../../../../app.routes";
import { useParams } from "react-router-dom";

const DeleteEmailModal = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { addressId } = useParams();

  const deleteEmail = async () => {
    await useFetch(`/inbox/${addressId}`, null, "DELETE");
  };

  const { isLoading, mutateAsync } = useMutation(deleteEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      setOpen(false);
      message.success("Address deleted successfully");
      setTimeout(() => {
        window.location.href = APP_ROUTES.NODELESS_ADDRESS_INDEX;
      }, 1000);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error deleting address");
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <Box>
      <Button sx={styles.deleteButton} onClick={() => setOpen(true)}>
        Delete Address
      </Button>

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Delete Address"
      >
        <Typography sx={styles.text}>
          This action would wipe out all details and messages received. Please
          make sure that this is a confirmed action as it is irreversible
        </Typography>

        <Divider />

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <ErrorButton
            text="Delete"
            styles={styles.button}
            onClick={handleDelete}
            disabled={isLoading}
            loading={isLoading}
          />
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  deleteButton: {
    color: "#E02424",
    textTransform: "none",
    textDecoration: "underline",
    marginLeft: {
      xs: "50px",
      md: "unset",
    },
    marginTop: {
      xs: "20px",
      md: "unset",
    },
  },
  text: {
    marginBottom: "30px",
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
  },
  button: {
    width: "120px",
    margin: "auto",
  },
};

export default DeleteEmailModal;
