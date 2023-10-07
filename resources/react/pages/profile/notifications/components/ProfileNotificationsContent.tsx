import React from "react";
import {
  Grid,
  Typography,
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { UserNotificationContext } from "../../../../contexts/user/UserNotificationContext";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import { useFetch } from "../../../../hooks/useFetch";
import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { convertDataIntoBoolean } from "../../../../utils/helpers";

const ProfileReferralsContent = () => {
  const { notifications } = React.useContext(UserNotificationContext);
  const queryClient = useQueryClient();

  const initialState = {
    withdrawal_success: false,
    withdrawal_failure: false,
    store_payment: false,
    store_underpaid: false,
    store_overpaid: false,
    store_webhook_failure: false,
    donation_page_payment: false,
    donation_page_underpaid: false,
    donation_page_overpaid: false,
    donation_page_webhook_failure: false,
    paywall_payment: false,
    paywall_underpaid: false,
    paywall_overpaid: false,
    paywall_webhook_failure: false,
    lightning_address_payment: false,
    referral_payment: false,
  };

  const [state, setState] = React.useState(initialState);

  const [isAllNotificationsEnabled, setIsAllNotificationsEnabled] =
    React.useState(false);
  const [isAllNotificationsDisabled, setIsAllNotificationsDisabled] =
    React.useState(false);

  const setAllTrue = () => {
    setState({
      withdrawal_success: true,
      withdrawal_failure: true,
      store_payment: true,
      store_underpaid: true,
      store_overpaid: true,
      store_webhook_failure: true,
      donation_page_payment: true,
      donation_page_underpaid: true,
      donation_page_overpaid: true,
      donation_page_webhook_failure: true,
      paywall_payment: true,
      paywall_underpaid: true,
      paywall_overpaid: true,
      paywall_webhook_failure: true,
      lightning_address_payment: true,
      referral_payment: true,
    });
  };

  const setAllFalse = () => {
    setState({
      withdrawal_success: false,
      withdrawal_failure: false,
      store_payment: false,
      store_underpaid: false,
      store_overpaid: false,
      store_webhook_failure: false,
      donation_page_payment: false,
      donation_page_underpaid: false,
      donation_page_overpaid: false,
      donation_page_webhook_failure: false,
      paywall_payment: false,
      paywall_underpaid: false,
      paywall_overpaid: false,
      paywall_webhook_failure: false,
      lightning_address_payment: false,
      referral_payment: false,
    });
  };

  const enableAllNotifications = () => {
    if (!isAllNotificationsEnabled) {
      setAllTrue();
      setIsAllNotificationsDisabled(false);
    } else {
      setAllFalse();
    }

    setIsAllNotificationsEnabled(!isAllNotificationsEnabled);
  };

  const disableAllNotifications = () => {
    if (!isAllNotificationsDisabled) {
      setAllFalse();
      setIsAllNotificationsEnabled(false);
    }

    setIsAllNotificationsDisabled(!isAllNotificationsDisabled);
  };

  React.useEffect(() => {
    if (Object.values(state).every((value) => value === true)) {
      setIsAllNotificationsEnabled(true);
    }
  }, [state]);

  React.useEffect(() => {
    setState({
      withdrawal_success: convertDataIntoBoolean(
        notifications?.withdrawal_success
      ),
      withdrawal_failure: convertDataIntoBoolean(
        notifications?.withdrawal_failure
      ),
      store_payment: convertDataIntoBoolean(notifications?.store_payment),
      store_underpaid: convertDataIntoBoolean(notifications?.store_underpaid),
      store_overpaid: convertDataIntoBoolean(notifications?.store_overpaid),
      store_webhook_failure: convertDataIntoBoolean(
        notifications?.store_webhook_failure
      ),
      donation_page_payment: convertDataIntoBoolean(
        notifications?.donation_page_payment
      ),
      donation_page_underpaid: convertDataIntoBoolean(
        notifications?.donation_page_underpaid
      ),
      donation_page_overpaid: convertDataIntoBoolean(
        notifications?.donation_page_overpaid
      ),
      donation_page_webhook_failure: convertDataIntoBoolean(
        notifications?.donation_page_webhook_failure
      ),
      paywall_payment: convertDataIntoBoolean(notifications?.paywall_payment),
      paywall_underpaid: convertDataIntoBoolean(
        notifications?.paywall_underpaid
      ),
      paywall_overpaid: convertDataIntoBoolean(notifications?.paywall_overpaid),
      paywall_webhook_failure: convertDataIntoBoolean(
        notifications?.paywall_webhook_failure
      ),
      lightning_address_payment: convertDataIntoBoolean(
        notifications?.lightning_address_payment
      ),
      referral_payment: convertDataIntoBoolean(notifications?.referral_payment),
    });
  }, [notifications]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAllNotificationsDisabled) {
      return;
    }
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const updateNotifications = async (payload: any) => {
    const response = await useFetch(
      "/user/notification-settings",
      payload,
      "PUT"
    );

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(updateNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user-notifications"]);

      message.success("Notifications settings updated successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message ||
          "Error updating notifications settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isAllNotificationsEnabled
      ? {
          withdrawal_success: true,
          withdrawal_failure: true,
          store_payment: true,
          store_underpaid: true,
          store_overpaid: true,
          store_webhook_failure: true,
          donation_page_payment: true,
          donation_page_underpaid: true,
          donation_page_overpaid: true,
          donation_page_webhook_failure: true,
          paywall_payment: true,
          paywall_underpaid: true,
          paywall_overpaid: true,
          paywall_webhook_failure: true,
          lightning_address_payment: true,
          referral_payment: true,
        }
      : state;

    await mutateAsync(payload);
  };

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            padding: {
              xs: "0 20px",
            },
            width: "100%",
          }}
        >
          <Typography sx={styles.header}>Email Notifications</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        <Box
          sx={styles.section}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormGroup sx={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={isAllNotificationsEnabled}
                  onChange={enableAllNotifications}
                  name="new"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Enable All Notifications
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={isAllNotificationsDisabled}
                  onChange={disableAllNotifications}
                  name="new"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Disable All Notifications
                </Typography>
              }
            />
          </FormGroup>

          <Typography sx={styles.label}>Withdrawals</Typography>

          <FormGroup sx={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.withdrawal_success}
                  onChange={handleCheckChange}
                  name="withdrawal_success"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Successful Withdrawals
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.withdrawal_failure}
                  onChange={handleCheckChange}
                  name="withdrawal_failure"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Failed Withdrawals
                </Typography>
              }
            />
          </FormGroup>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography sx={styles.label}>Store</Typography>

          <FormGroup sx={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.store_payment}
                  onChange={handleCheckChange}
                  name="store_payment"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>Paid Invoice</Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.store_overpaid}
                  onChange={handleCheckChange}
                  name="store_overpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Overpaid Invoice
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.store_underpaid}
                  onChange={handleCheckChange}
                  name="store_underpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Partially Paid Invoice
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.store_webhook_failure}
                  onChange={handleCheckChange}
                  name="store_webhook_failure"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Webhook Delivery Failed
                </Typography>
              }
            />
          </FormGroup>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography sx={styles.label}>Donations</Typography>

          <FormGroup sx={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.donation_page_payment}
                  onChange={handleCheckChange}
                  name="donation_page_payment"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Donations made
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.donation_page_underpaid}
                  onChange={handleCheckChange}
                  name="donation_page_underpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Partial Donations
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.donation_page_overpaid}
                  onChange={handleCheckChange}
                  name="donation_page_overpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Over paid Donations
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.donation_page_webhook_failure}
                  onChange={handleCheckChange}
                  name="donation_page_webhook_failure"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Webhook delivery failed
                </Typography>
              }
            />
          </FormGroup>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography sx={styles.label}>Paywall</Typography>

          <FormGroup sx={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.paywall_payment}
                  onChange={handleCheckChange}
                  name="paywall_payment"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>Requests paid</Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.paywall_underpaid}
                  onChange={handleCheckChange}
                  name="paywall_underpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Partial Request
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.paywall_overpaid}
                  onChange={handleCheckChange}
                  name="paywall_overpaid"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Over paid Requests
                </Typography>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.paywall_webhook_failure}
                  onChange={handleCheckChange}
                  name="paywall_webhook_failure"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Webhook delivery failed
                </Typography>
              }
            />
          </FormGroup>

          <Divider sx={{ margin: "20px 0" }} />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.lightning_address_payment}
                  onChange={handleCheckChange}
                  name="lightning_address_payment"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Lightning Address Payment
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={state.referral_payment}
                  onChange={handleCheckChange}
                  name="referral_payment"
                />
              }
              label={
                <Typography sx={styles.checkboxLabel}>
                  Referral Payment
                </Typography>
              }
            />
          </FormGroup>

          <Divider sx={{ margin: "20px 0" }} />

          <SecondaryContainedButton
            text="Save"
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            styles={styles.saveButton}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    padding: {
      xs: "0px",
      md: "10px 30px",
    },
  },
  header: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    marginBottom: {
      xs: "20px",
      md: "10px",
    },
  },
  section: {
    background: "#F7F7F7",
    padding: "30px 30px 90px 30px",
    borderRadius: "10px",
  },
  checkboxLabel: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "600",
  },
  label: {
    color: "#9CA3AF",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    marginBottom: "20px",
  },
  saveButton: {
    height: "40px",
    width: "120px",
    float: "right",
  },
};

export default ProfileReferralsContent;
