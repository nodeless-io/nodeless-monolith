import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Divider,
  InputBase,
  InputLabel,
  FormControl,
  Paper,
  Stack,
  Switch,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import { DefaultWithdrawalType, formatData } from "./helpers";
import { SelectChangeEvent } from "@mui/material/Select";
import HelpIcon from "@mui/icons-material/Help";
import LightningAddressTooltip from "./LightningAddressTooltip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F7F7F7",
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "15px",
    marginBottom: "100px",
  },
  borderRadius: "8px",
}));

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

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#6B7280",
    color: "#FFFFFF",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    fontWeight: "600",
    lineHeight: "150%",
    padding: "10px",
    borderRadius: "10px",
  },
}));

const WithdrawSettingsContent = () => {
  const { withdrawalSettings } = React.useContext(WithdrawContext);
  const [isEditable, setIsEditable] = React.useState(false);

  const queryClient = useQueryClient();

  const [state, setState] = React.useState({
    lightningAddress: "",
    onChainAddress: "",
    paymentMethod: "",
    automaticWithdrawals: null,
  });

  React.useEffect(() => {
    setState({
      lightningAddress: withdrawalSettings.lightning_address,
      onChainAddress: withdrawalSettings.onchain_address,
      paymentMethod: withdrawalSettings.default_withdrawal_type,
      automaticWithdrawals: withdrawalSettings.auto_withdraw,
    });
  }, [withdrawalSettings]);

  const updateWithdrawSettings = async (payload) => {
    const response = await useFetch("/withdrawal/settings", payload, "PUT");

    return response;
  };

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
      queryClient.invalidateQueries([`withdrawal`]);
      message.success("Withdrawal settings updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error saving withdrawal settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mutateAsync({
      lightning_address: state.lightningAddress,
      onchain_address: state.onChainAddress,
      auto_withdraw: state.automaticWithdrawals == 0 ? false : true,
      default_withdrawal_type: state.paymentMethod,
    });
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>Settings</Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Item elevation={0} sx={{ position: "relative" }}>
              <Typography sx={styles.smallScreenHeaderText}>
                General Settings
              </Typography>

              {!isEditable && (
                <IconButton
                  sx={styles.editIcon}
                  size="small"
                  onClick={() => setIsEditable(true)}
                >
                  <DriveFileRenameOutlineIcon fontSize="small" />
                </IconButton>
              )}

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "90%",
                        },
                      }}
                    >
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={{ ...styles.textFieldLabel, alignItems: "center" }}
                      >
                        <Stack direction="row">
                          Lightning Address
                          <span
                            style={{
                              marginLeft: "5px",
                              color: "red",
                              marginRight: "10px",
                            }}
                          >
                            *
                          </span>
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
                        </Stack>
                      </InputLabel>

                      <BootstrapInput
                        name="lightningAddress"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        placeholder="example@lightningwallet.com"
                        type="text"
                        onChange={handleChange}
                        value={state.lightningAddress}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>
                      Lightning Address{" "}
                      <LightningAddressTooltip>
                        <HelpIcon
                          sx={{
                            marginTop: "5px",
                            fontSize: "14px",
                            marginLeft: "10px",
                          }}
                        />
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
                    <Typography sx={styles.value}>
                      {state?.lightningAddress}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "90%",
                        },
                      }}
                    >
                      <InputLabel
                        shrinkw
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        On-chain Address{" "}
                        <span style={{ fontSize: "15px" }}>
                          (Min. withdrawal: 500k sats)
                        </span>
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          *
                        </span>
                      </InputLabel>

                      <BootstrapInput
                        name="onChainAddress"
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={state.onChainAddress}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>
                      On-chain Address{" "}
                      <span style={{ fontSize: "12px" }}>
                        (Min. withdrawal: 500k sats)
                      </span>
                    </Typography>
                    <Typography sx={styles.value}>
                      {state?.onChainAddress}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "90%",
                        },
                      }}
                    >
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Default Payment Method
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          *
                        </span>
                      </InputLabel>
                      <Select
                        onChange={handleSelectChange}
                        value={state.paymentMethod}
                        input={<BootstrapInput />}
                      >
                        {DefaultWithdrawalType.map((type, index) => (
                          <MenuItem key={index} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>
                      Default Payment Method
                    </Typography>
                    <Typography sx={styles.value}>
                      {formatData(state?.paymentMethod)}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "90%",
                        },
                      }}
                    >
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Automatic Withdrawals
                      </InputLabel>

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
                        automatically.
                      </Typography>

                      <Switch
                        color="secondary"
                        checked={
                          state?.automaticWithdrawals == 0 ? false : true
                        }
                        onChange={handleSwitchChange}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Stack direction="row">
                      <Typography sx={{ ...styles.label, marginRight: "5px" }}>
                        Automatic Withdrawals
                      </Typography>

                      <LightTooltip
                        title="Send payments directly to my preferred payment method
                        automatically. Lightning sends every minute. On-Chain sends
                        every 30 Minutes (500,000 sat minimum)."
                        placement="bottom-start"
                      >
                        <InfoIcon
                          //@ts-ignore
                          color="gray"
                          fontSize="small"
                        />
                      </LightTooltip>
                    </Stack>

                    <Typography sx={styles.value}>
                      {formatData(state?.automaticWithdrawals)}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box sx={styles.footer}>
                {isEditable && (
                  <Button
                    sx={styles.cancelButton}
                    onClick={() => setIsEditable(false)}
                  >
                    Cancel
                  </Button>
                )}

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <SecondaryContainedButton
                    text="Save"
                    styles={
                      isEditable ? styles.saveButton : styles.disabledSaveButton
                    }
                    disabled={isLoading}
                    type="submit"
                  />
                </Box>
              </Box>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  settingsLabel: {
    display: {
      xs: "none",
      md: "block",
    },
  },

  formItem: {
    marginBottom: "10px",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  footer: {
    width: "100%",
    display: {
      xs: "block",
      md: "flex",
    },
    justifyContent: {
      xs: "center",
      md: "right",
    },
    marginTop: "30px",
  },
  divider: {
    margin: "20px 20px 20px 0",
  },
  label: {
    color: "#9CA3AF",
    marginBottom: "15px",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  value: {
    color: "#1F2A37",
    marginBottom: "15px",
    fontSize: {
      xs: "13px",
      md: "16px",
    },
    fontWeight: "600",
    marginLeft: "10px",
  },
  container: {
    marginTop: {
      xs: "10px",
      sm: "40px",
    },
  },
  headerText: {
    color: "#6B7280",
    fontSize: {
      xs: "16px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "300px",
  },
  smallScreenHeaderText: {
    color: "#F04200",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "10px",
    marginBottom: "30px",
    display: {
      md: "none",
    },
  },
  saveButton: {
    width: "120px",
    height: "42px",
  },
  disabledSaveButton: {
    width: "120px",
    height: "42px",
    background: "#D1D5DB",
    cursor: "not-allowed",
    "&:hover": {
      background: "#D1D5DB",
    },
    display: {
      xs: "none",
      md: "flex",
    },
  },
  editIcon: {
    position: "absolute",
    right: 30,
    top: 20,
    background: "#FFECE3",
    color: "#FF5A1F",
    "&:hover": {
      background: "#FFECE3",
      color: "#FF5A1F",
    },
    display: {
      xs: "none",
      md: "block",
    },
    padding: "5px 7px",
  },
  cancelButton: {
    borderRadius: "6px",
    color: "#4B5563",
    textTransform: "none",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid #9CA3AF",
    height: "42px",
    width: "120px",
    marginRight: "20px",
    "&:hover": {
      color: "#4B5563",
      border: "1px solid #4B5563",
      background: "#D1D5DB",
    },
  },
};

export default WithdrawSettingsContent;
