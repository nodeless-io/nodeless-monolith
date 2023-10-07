import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  InputBase,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { IUpdateStoreWebhook } from "../../../../../types/stores.interface";
import {
  SecondaryContainedButton,
  SecondaryOutlinedButton,
} from "../../../../components/custom-components/Button";
import { alpha, styled } from "@mui/material/styles";
import Checkbox from "../../../../components/custom-components/Checkbox";
import {
  formatCreateWebhookData,
  formatUpdateWebhooksEventState,
} from "../../../../../utils/helpers";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FF5A1F",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #3F83F8",
    fontSize: "14px",
    width: "100%",
    padding: "10px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "15px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#3F83F8",
    },
  },
}));

const UpdateDonationPageWebhookModal = ({
  webhook,
  children,
  setOpen,
  open,
}: any) => {
  const initialState = {
    url: webhook.url,
    events: formatUpdateWebhooksEventState(webhook.events),
    status: "active",
  };

  const [state, setState] = React.useState(initialState);

  const queryClient = useQueryClient();

  const updateWebhook = async ({ uuid, payload }) => {
    await useFetch(`/bitcoinable_webhook/uuid/${uuid}`, payload, "PUT");
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      events: {
        ...state.events,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const { isLoading, mutateAsync } = useMutation(updateWebhook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["donation_page-webhooks"]);
      setState(initialState);

      setOpen(false);
      message.success("Webhook updated successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error updating webhooks"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload: IUpdateStoreWebhook = {
      ...formatCreateWebhookData(state),
    };

    await mutateAsync({
      uuid: webhook.uuid,
      payload,
    });
  };

  return (
    <Box>
      {children}

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Update Webhook"
        isCenter={false}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ padding: "10px 15px" }}
        >
          <Box sx={styles.section}>
            <Box sx={styles.formItem}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  htmlFor="url"
                  color="secondary"
                  sx={styles.textFieldLabel}
                >
                  URL
                </InputLabel>

                <BootstrapInput
                  id="url"
                  name="url"
                  autoFocus
                  required
                  fullWidth
                  size="small"
                  type="url"
                  onChange={handleChange}
                  value={state.url}
                />
              </FormControl>
            </Box>
          </Box>

          <Box sx={styles.section}>
            <InputLabel
              shrink
              htmlFor="url"
              color="secondary"
              sx={styles.textFieldLabel}
            >
              Events
            </InputLabel>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.new}
                    onChange={handleCheckChange}
                    name="new"
                  />
                }
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Created
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.pending_confirmation}
                    onChange={handleCheckChange}
                    name="pending_confirmation"
                  />
                }
                sx={styles.checkboxLabel}
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Pending Confirmation
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.paid}
                    onChange={handleCheckChange}
                    name="paid"
                  />
                }
                sx={styles.checkboxLabel}
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Paid
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.overpaid}
                    onChange={handleCheckChange}
                    name="overpaid"
                  />
                }
                sx={styles.checkboxLabel}
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Overpaid
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.underpaid}
                    onChange={handleCheckChange}
                    name="underpaid"
                  />
                }
                sx={styles.checkboxLabel}
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Underpaid
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    checked={state.events.expired}
                    onChange={handleCheckChange}
                    name="expired"
                  />
                }
                sx={styles.checkboxLabel}
                label={
                  <Typography sx={styles.checkboxLabel}>
                    Donation Expired
                  </Typography>
                }
              />
            </FormGroup>
          </Box>

          <Box sx={styles.footer}>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "120px",
                },
              }}
            >
              <SecondaryContainedButton
                text="Update"
                disabled={isLoading}
                loading={isLoading}
                type="submit"
                styles={styles.saveButton}
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "unset",
                },
              }}
            >
              <SecondaryOutlinedButton
                text="Cancel"
                onClick={() => setOpen(false)}
                styles={styles.cancelButton}
              />
            </Box>
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
  section: {
    background: {
      xs: "transparent",
      md: "#F9FAFB",
    },
    borderRadius: "20px",
    padding: {
      xs: "10px",
      md: "20px",
    },
    marginBottom: "20px",
    width: "100%",
  },
  formItem: {
    marginBottom: "10px",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FF5A1F",
  },
  footer: {
    marginTop: "15px",
    display: {
      xs: "block",
      md: "flex",
    },
    flexDirection: "row-reverse",
    width: {
      xs: "100%",
      md: "unset",
    },
  },
  checkboxLabel: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "600",
  },
  cancelButton: {
    height: "40px",
    marginRight: "15px",
    width: {
      xs: "100%",
      md: "120px",
    },
    color: "#4B5563",
    border: "1px solid #4B5563",
    "&:hover": {
      color: "#4B5563",
      border: "1px solid #4B5563",
      background: "#D1D5DB",
    },
    marginTop: {
      xs: "20px",
      md: 0,
    },
  },
  saveButton: {
    height: "40px",
    marginLeft: {
      xs: 0,
      md: "15px",
    },
    width: "100%",
  },
};

export default UpdateDonationPageWebhookModal;
