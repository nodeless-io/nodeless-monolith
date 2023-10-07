import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Divider,
  InputBase,
  InputLabel,
  FormControl,
  Paper,
  Stack,
} from "@mui/material";
import { useFetch } from "../../../../hooks/useFetch";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import {
  SecondaryContainedButton,
  SecondaryOutlinedButton,
} from "../../../components/custom-components/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import { message } from "antd";
import { UserContext } from "../../../../contexts/user/UserContext";
import UpdateAccountSettingsModal from "./modals/UpdateAccountSettingsModal";
import UpdatedPasswordSettings from "./modals/UpdatedPasswordSettings";
import { useMutation } from "react-query";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F7F7F7",
  padding: "30px",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "#fff",
    padding: "10px 0",
    marginTop: "-20px",
  },
}));

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
    marginBottom: "10px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#FF956B",
    },
  },
}));

const AccountSettingsContent = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const [state, setState] = React.useState({
    username: "",
    email: "",
    old_password: "",
    password: "",
    confirm_password: "",
  });

  React.useEffect(() => {
    setState({
      ...state,
      email: user?.email,
    });
  }, [user]);

  const updateSettings = async (payload) => {
    const response = await useFetch("/change-password", payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(updateSettings, {
    onSuccess: () => {
      message.success("Password changed successfully!");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.status || "Error changing password");
    },
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      old_password: state.old_password,
      password: state.password,
      confirm_password: state.confirm_password,
    };

    await mutateAsync(payload);
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>Account Details</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component="form" autoComplete="off">
            <Item elevation={0} sx={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: {
                    xs: "10px 20px",
                    md: 0,
                  },
                }}
              >
                <Typography sx={styles.smallScreenHeaderText}>
                  Account Details
                </Typography>

                <UpdateAccountSettingsModal />
              </Box>
              {/* {!isEditable && (
                <IconButton
                  sx={styles.editIcon}
                  size="small"
                  onClick={() => setIsEditable(true)}
                >
                  <DriveFileRenameOutlineIcon fontSize="small" />
                </IconButton>
              )} */}

              <Box
                sx={{
                  background: {
                    xs: "#F7F7F7",
                    md: "unset",
                  },
                  padding: {
                    xs: "20px",
                    md: "0px",
                  },
                }}
              >
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Username
                      </InputLabel>

                      <BootstrapInput
                        name="username"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={state.username}
                        autoComplete="username"
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Username</Typography>
                    <Typography sx={styles.value}>{state?.email}</Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box
                sx={{
                  background: {
                    xs: "#F7F7F7",
                    md: "unset",
                  },
                  padding: {
                    xs: "0 20px 20px 20px",
                    md: "0px",
                  },
                }}
              >
                {isEditable ? (
                  <Box sx={{ ...styles.formItem, position: "relative" }}>
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -12,
                        right: 0,
                        zIndex: 1000,
                      }}
                      onClick={() => setIsEditable(false)}
                    >
                      <CloseIcon fontSize="small" sx={{ color: "#4B5563" }} />
                    </IconButton>

                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Email
                      </InputLabel>

                      <BootstrapInput
                        name="email"
                        required
                        fullWidth
                        size="small"
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        autoComplete="email"
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Email</Typography>
                    <Typography sx={styles.value}>{state?.email}</Typography>
                  </>
                )}
              </Box>

              {isEditable && (
                <Box>
                  <Divider sx={styles.divider} />

                  <Stack direction="row" sx={styles.footer}>
                    <SecondaryContainedButton
                      text="Save"
                      type="submit"
                      styles={{
                        width: "120px",
                        marginRight: "20px",
                        height: "45px",
                      }}
                      onClick={() => message.success("Email saved")}
                    />

                    <SecondaryOutlinedButton
                      text="Send verification email"
                      styles={{
                        width: "220px",
                        color: "#4B5563",
                        border: "1px solid #4B5563",
                        "&:hover": {
                          background: "#4B5563",
                          color: "white",
                        },
                      }}
                      onClick={() => message.success("Verification email sent")}
                    />
                  </Stack>
                </Box>
              )}
            </Item>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "0 0 50px 0" }} />

      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>Password</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handlePasswordSubmit}
          >
            <Item elevation={0} sx={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: {
                    xs: "10px 20px",
                    md: "0px",
                  },
                }}
              >
                <Typography sx={styles.smallScreenHeaderText}>
                  Password
                </Typography>

                <UpdatedPasswordSettings />
              </Box>

              {!isPasswordEditable && (
                <IconButton
                  sx={styles.editIcon}
                  size="small"
                  onClick={() => setIsPasswordEditable(true)}
                >
                  <DriveFileRenameOutlineIcon fontSize="small" />
                </IconButton>
              )}

              <Box
                sx={{
                  background: {
                    xs: "#F7F7F7",
                    md: "unset",
                  },
                  padding: {
                    xs: "20px",
                    md: "0px",
                  },
                }}
              >
                {isPasswordEditable ? (
                  <Box sx={{ ...styles.formItem, position: "relative" }}>
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: 0,
                        zIndex: 1000,
                      }}
                      onClick={() => setIsPasswordEditable(false)}
                    >
                      <CloseIcon fontSize="small" sx={{ color: "#4B5563" }} />
                    </IconButton>

                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Password
                      </InputLabel>

                      <BootstrapInput
                        name="old_password"
                        required
                        fullWidth
                        size="small"
                        type="password"
                        onChange={handleChange}
                        value={state.old_password}
                        placeholder="Current Password"
                        autoComplete="current-password"
                      />

                      <BootstrapInput
                        name="password"
                        required
                        fullWidth
                        size="small"
                        type="password"
                        onChange={handleChange}
                        value={state.password}
                        placeholder="New Password"
                        autoComplete="new-password"
                      />

                      <BootstrapInput
                        name="confirm_password"
                        required
                        fullWidth
                        size="small"
                        type="password"
                        onChange={handleChange}
                        value={state.confirm_password}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Password</Typography>
                    <Typography sx={styles.value}>********</Typography>
                  </>
                )}
              </Box>

              {isPasswordEditable && (
                <Box>
                  <Divider sx={styles.divider} />

                  <Stack direction="row" sx={styles.footer}>
                    <SecondaryContainedButton
                      text="Save"
                      type="submit"
                      styles={{
                        width: "120px",
                        marginRight: "20px",
                        height: "45px",
                      }}
                      onClick={handlePasswordSubmit}
                      loading={isLoading}
                      disabled={
                        !state.confirm_password ||
                        !state.old_password ||
                        !state.password
                      }
                    />
                  </Stack>
                </Box>
              )}
            </Item>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ ...styles.divider, marginBottom: "20px" }} />

      <Box
        sx={{
          marginBottom: {
            xs: "150px",
            md: "30px",
          },
          padding: {
            xs: "20px",
            md: "5px",
          },
        }}
      >
        <Typography sx={styles.headerText}>Delete Account</Typography>

        <DeleteAccountModal />
      </Box>
    </Box>
  );
};

const styles = {
  gridContainer: {
    position: "relative",
    marginBottom: {
      xs: "-30px",
      md: "40px",
    },
  },
  settingsLabel: {
    display: {
      xs: "none",
      md: "block",
    },
  },
  deleteButton: {
    color: "#E02424",
    textTransform: "none",
    textDecoration: "underline",
  },
  formItem: {
    marginBottom: "10px",
    width: "100%",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "right",
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
  },
  value: {
    color: "#FF7847",
    marginBottom: "15px",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "10px",
      md: "0px",
    },
  },
  container: {
    marginTop: {
      xs: "10px",
      sm: "40px",
    },
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "30px",
  },
  smallScreenHeaderText: {
    color: "#111928",
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
    bottom: 50,
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
    padding: "3px 5px",
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

export default AccountSettingsContent;
