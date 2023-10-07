import React from "react";
import {
  Box,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  Switch,
  Select,
  MenuItem,
  InputBase,
  Stack,
} from "@mui/material";
import Modal from "../../../../components/custom-components/Modal";
import { useFetch } from "../../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  SecondaryContainedButton,
  SecondaryOutlinedButton,
} from "../../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { CustomInput } from "../../../../components/custom-components/Input";
import { WithdrawContext } from "../../../../../contexts/withdraw/WithdrawContext";
import { SelectChangeEvent } from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import { DefaultWithdrawalType } from "../helpers";
import LightningAddressTooltip from "../LightningAddressTooltip";
import HelpIcon from "@mui/icons-material/Help";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #D1D5DB;",
    fontSize: "14px",
    width: "100%",
    padding: "10px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "30px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#FF956B",
    },
  },
}));

const UpdateWithdrawSettingsModal = () => {
  const [open, setOpen] = React.useState(false);
  const { withdrawalSettings } = React.useContext(WithdrawContext);

  const [state, setState] = React.useState({
    lightningAddress: "",
    onChainAddress: "",
    paymentMethod: "",
    automaticWithdrawals: null,
  });

  const queryClient = useQueryClient();

  const updateWithdrawSettings = async (payload) => {
    const response = await useFetch("/withdrawal/settings", payload, "PUT");

    return response;
  };

  React.useEffect(() => {
    setState({
      lightningAddress: withdrawalSettings.lightning_address,
      onChainAddress: withdrawalSettings.onchain_address,
      paymentMethod: withdrawalSettings.default_withdrawal_type,
      automaticWithdrawals: withdrawalSettings.auto_withdraw,
    });
  }, [withdrawalSettings]);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      automaticWithdrawals: event.target.checked ? 1 : 0,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      paymentMethod: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateWithdrawSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["withdrawal"]);
      message.success("Settings updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      //...state,
      lightning_address: state.lightningAddress,
      onchain_address: state.onChainAddress,
      default_withdrawal_type: state.paymentMethod,
      auto_withdraw: state.automaticWithdrawals,
    });
  };

  return (
    <Box>
      <IconButton
        sx={styles.editIcon}
        size="small"
        onClick={() => setOpen(true)}
      >
        <DriveFileRenameOutlineIcon fontSize="small" />
        <Typography
          sx={{ marginLeft: "10px", fontSize: "13px", fontWeight: "600" }}
        >
          Edit
        </Typography>
      </IconButton>

      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title="Edit Withdrawal Setting"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label={
              <Typography sx={styles.label}>
                Lightning Address
                <span style={{ marginLeft: "5px", color: "red" }}>*</span>{" "}
                <LightningAddressTooltip>
                  <HelpIcon sx={{ fontSize: "20px" }} />
                </LightningAddressTooltip>
                <a
                            href="https://walletofsatoshi.com/"
                            target="_blank"
                            style={{
                              color: "#FF5A1F",
                              marginLeft: "10px",
                              fontSize: "14px",
                            }}
                          >
                            Wallet of Satoshi{` `} 
                          </a>
                          {` `}
                          <a
                            href="https://getalby.com/"
                            target="_blank"
                            style={{
                              color: "#FF5A1F",
                              marginLeft: "10px",
                              fontSize: "14px",
                            }}
                          >
                            Alby
                          </a>
              </Typography>
            }
            name="lightningAddress"
            value={state.lightningAddress}
            autoComplete="name"
            type="text"
            required
          />

          <CustomInput
            handleChange={handleChange}
            label={
              <Typography sx={styles.label}>
                On-chain Address{" "}
                <span style={{ fontSize: "15px" }}>
                  (Min. withdrawal: 500k sats)
                </span>
                <span style={{ marginLeft: "5px", color: "red" }}>*</span>
              </Typography>
            }
            name="onChainAddress"
            value={state.onChainAddress}
            type="text"
          />

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                //@ts-ignore
                color="gray"
                sx={styles.textFieldLabel}
              >
                Default Payment Method{" "}
                <span style={{ marginLeft: "5px", color: "red" }}>*</span>{" "}
              </InputLabel>

              <Select
                onChange={handleSelectChange}
                value={state.paymentMethod}
                input={<BootstrapInput />}
                size="small"
              >
                {DefaultWithdrawalType.map((type, index) => (
                  <MenuItem key={index} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant="standard">
              <InputLabel
                shrink
                //@ts-ignore
                color="gray"
                sx={styles.textFieldLabel}
              >
                Automatic Withdrawals
              </InputLabel>

              <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
                <Typography
                  sx={{
                    color: "#4B5563",
                    lineHeight: "100%",
                    fontWeight: "600",
                    fontSize: "13px",
                    margin: "30px 0 15px 0",
                  }}
                >
                  Send payments directly to my preferred payment method
                  automatically. Lightning sends every minute. On-Chain sends
                  every 4 hours.
                </Typography>

                <Switch
                  color="secondary"
                  checked={state?.automaticWithdrawals == 0 ? false : true}
                  onChange={handleSwitchChange}
                />
              </Stack>
            </FormControl>
          </Box>

          <Box sx={styles.footer}>
            <SecondaryContainedButton
              text="Save"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              styles={styles.saveButton}
            />

            <Box sx={{ width: "100%" }}>
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
  label: {
    // color: "#9CA3AF",
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "600",
  },
  formContainer: {
    marginTop: "30px",
    width: "100%",
    padding: "10px",
  },
  formItem: {
    marginBottom: "40px",
    width: "100%",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  footer: {
    marginTop: "15px",
    width: "100%",
  },
  checkboxLabel: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "600",
  },
  cancelButton: {
    height: "40px",
    color: "#4B5563",
    border: "unset",
    textDecoration: "underline",
  },
  saveButton: {
    height: "40px",
    marginBottom: "15px",
    width: "100%",
  },
  editIcon: {
    color: "#FF5A1F",
    display: {
      md: "none",
    },
    "&:hover": {
      background: "transparent",
      color: "#FF5A1F",
    },
  },
};

export default UpdateWithdrawSettingsModal;
