import React from "react";
import {
  Box,
  Typography,
  InputBase,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { StoreContext } from "../../../../../contexts/store/StoreContext";
import { useParams } from "react-router-dom";
import { ICreateStoreWebhook } from "../../../../../types/webhooks.interface";
import { generateSecret } from "../../../../../utils/Utils";
import {
  SecondaryContainedButton,
  SecondaryOutlinedButton,
} from "../../../../components/custom-components/Button";
import { alpha, styled } from "@mui/material/styles";
import Checkbox from "../../../../components/custom-components/Checkbox";
import { formatCreateWebhookData } from "../../../../../utils/helpers";

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

const CreateStoreWebhookModal = () => {
  const {
    createStoreWebhookModalOpen,
    setCreateStoreWebhookModalOpen,
  } = React.useContext(StoreContext);

  const { storeId } = useParams();

  const initialState = {
    type: "store",
    url: "",
    secret: generateSecret(),
    events: {
      new: false,
      pending_confirmation: false,
      paid: false,
      expired: false,
      overpaid: false,
      underpaid: false,
    },

    status: "active",
  };

  const [state, setState] = React.useState(initialState);

  const queryClient = useQueryClient();

  const createStoreWebhooks = async (payload: ICreateStoreWebhook) => {
    const response = await useFetch("/bitcoinable_webhook", payload, "POST");

    return response;
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

  const { isLoading, mutateAsync } = useMutation(createStoreWebhooks, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores-webhooks"]);
      setState({
        ...initialState,
        secret: generateSecret(),
      });

      setCreateStoreWebhookModalOpen(false);
      message.success("Webhook created successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error creating webhooks"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mutateAsync(formatCreateWebhookData({ ...state, uuid: storeId }));
  };

  return (
    <Modal
      handleClose={() => setCreateStoreWebhookModalOpen(false)}
      open={createStoreWebhookModalOpen}
      title="Add Webhook"
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

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                htmlFor="url"
                color="secondary"
                sx={styles.textFieldLabel}
              >
                Secret
              </InputLabel>

              <BootstrapInput
                id="secret"
                name="secret"
                required
                fullWidth
                size="small"
                type="text"
                onChange={handleChange}
                value={state.secret}
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            ...styles.section,
            marginTop: {
              xs: "30px",
              md: "0px",
            },
          }}
        >
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
                  Invoice Created
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
                  Invoice Pending Confirmation
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
                <Typography sx={styles.checkboxLabel}>Invoice Paid</Typography>
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
                  Invoice Overpaid
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
                  Invoice Underpaid
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
                  Invoice Expired
                </Typography>
              }
            />
          </FormGroup>
        </Box>

        <Box sx={styles.footer}>
          <Box
            sx={{
              width: {
                md: "120px",
              },
              marginLeft: {
                md: "25px",
              },
            }}
          >
            <SecondaryContainedButton
              text="Save"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              styles={styles.saveButton}
            />
          </Box>

          <Box
            sx={{
              width: {
                md: "120px",
              },
            }}
          >
            <SecondaryOutlinedButton
              text="Cancel"
              onClick={() => setCreateStoreWebhookModalOpen(false)}
              styles={styles.cancelButton}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
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
      xs: "0px",
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
    width: "100%",
  },
  checkboxLabel: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "600",
  },
  cancelButton: {
    height: "40px",
    marginRight: "15px",
    width: "100%",
    color: "#4B5563",
    border: "1px solid #4B5563",
    "&:hover": {
      color: "#4B5563",
      border: "1px solid #4B5563",
      background: "#D1D5DB",
    },
  },
  saveButton: {
    height: "40px",
    marginLeft: {
      xs: "unset",
      md: "15px",
    },
    width: "100%",
    marginBottom: "20px",
  },
};

export default CreateStoreWebhookModal;
