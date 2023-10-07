import * as React from "react";
import {
  Box,
  Typography,
  DialogTitle,
  Dialog,
  Divider,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import { ErrorButton } from "../../../../components/custom-components/Button";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { APP_ROUTES } from "../../../../app.routes";
import CloseIcon from "@mui/icons-material/Close";

const SmallScreenDeletePaywallModal = ({ uuid }) => {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const deletePaywall = async ({ uuid }) => {
    await useFetch(`/paywall/uuid/${uuid}`, null, "DELETE");
  };

  const { isLoading, mutateAsync } = useMutation(deletePaywall, {
    onSuccess: () => {
      queryClient.invalidateQueries([`paywall-${uuid}`, "paywalls"]);
      setOpen(false);
      message.success("Paywall deleted successfully");
      setTimeout(() => {
        window.location.href = APP_ROUTES.PAYWALL_PAYWALLS;
      }, 1000);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error deleting paywall");
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
      <Button sx={styles.deleteButton} onClick={() => setOpen(true)}>
        Delete Paywall
      </Button>

      <Dialog
        open={open}
        PaperProps={{
          sx: styles.centerPaperProps,
        }}
        fullWidth
        maxWidth="xs"
        BackdropProps={{
          style: styles.background,
        }}
        scroll="paper"
      >
        <DialogTitle sx={styles.centerTitle}>
          Delete Paywall
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={styles.smallCloseButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={styles.content}>
          <Typography sx={styles.text}>
            This action would wipe out all details and requests recorded. Please
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
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const styles = {
  content: {
    marginTop: "30px",
  },
  centerTitle: {
    textAlign: "center",
    color: "#E02424",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
  },
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
    marginBottom: "100px",
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
  centerPaperProps: {
    borderRadius: "12px",
    padding: "10px",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
  smallCloseButton: {
    position: "absolute",
    right: 10,
    top: 12,
    color: "#374151",
  },
};

export default SmallScreenDeletePaywallModal;
