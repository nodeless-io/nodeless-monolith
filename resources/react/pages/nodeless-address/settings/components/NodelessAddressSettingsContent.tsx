import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Grid,
  Divider,
  InputBase,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import DeleteEmailModal from "./modals/DeleteEmailModal";
import SmallScreenDeleteEmailModal from "./modals/SmallScreenDeleteEmailModal";
import { NodelessAddressContext } from "../../../../contexts/nodeless-address/NodelessAddressContext";
import generateNostrHexPub from "../../../../utils/hexPubGenerator";
import useScreenSize from "../../../../hooks/useScreenSize";
import { shortenString, formatter } from "../../../../utils/Utils";

const Item = styled(Paper)(() => ({
  backgroundColor: "#F7F7F7",
  padding: "30px",
  borderRadius: "8px",
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    color: "#9CA3AF",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "white",
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

const NodelessAddressSettingsContent = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const { addressId } = useParams<{ addressId: string }>();

  const queryClient = useQueryClient();
  const { nodelessAddress } = React.useContext(NodelessAddressContext);

  const [nodelessAddressData, setNodelessAddressData] = React.useState({
    username: "",
    price: 0,
    email: "",
    nostr_npub: "",
    nostr_hexpub: "",
  });

  React.useEffect(() => {
    setNodelessAddressData({
      username: nodelessAddress?.username,
      email: nodelessAddress?.email,
      price: nodelessAddress?.price,
      nostr_npub: nodelessAddress?.nostr_npub,
      nostr_hexpub: nodelessAddress?.nostr_hexpub,
    });
  }, [nodelessAddress]);

  const updateEmailSettings = async (payload) => {
    const response = await useFetch("/inbox/" + addressId, payload, "PUT");

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setNodelessAddressData({
      ...nodelessAddressData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateEmailSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries([`nodeless-address-${addressId}`]);
      message.success("Settings updated successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error updating settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nostr_hexpub;
    
    try {
      nostr_hexpub = generateNostrHexPub(nodelessAddressData.nostr_npub);
    } catch (error) {
      return;
    }

    await mutateAsync({
      ...nodelessAddress,
      username: nodelessAddressData.username,
      email: nodelessAddressData.email,
      price: nodelessAddressData.price,
      nostr_npub: nodelessAddressData.nostr_npub,
      nostr_hexpub,
    });
  };

  const {
    isMediumScreen,
    isExtraLargeScreen,
    isLargeScreen,
    isSmallScreen,
  } = useScreenSize();

  const renderNostrNpub = (npub: string) => {
    if (
      isMediumScreen &&
      isExtraLargeScreen &&
      isLargeScreen &&
      isSmallScreen
    ) {
      return shortenString(npub, 30);
    } else if (
      !isSmallScreen &&
      isMediumScreen &&
      isExtraLargeScreen &&
      isLargeScreen
    ) {
      return shortenString(npub);
    } else if (
      !isSmallScreen &&
      !isMediumScreen &&
      isExtraLargeScreen &&
      isLargeScreen
    ) {
      return shortenString(npub, 30);
    }

    return npub;
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>General Settings</Typography>

          <DeleteEmailModal />
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Item elevation={0} sx={{ position: "relative" }}>
              <Typography sx={styles.smallScreenHeaderText}>
                General Settings
              </Typography>

              <IconButton
                sx={styles.editIcon}
                size="small"
                onClick={() => setIsEditable(true)}
              >
                <DriveFileRenameOutlineIcon fontSize="small" />
              </IconButton>

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
                        position: "relative",
                      }}
                    >
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
                        value={nodelessAddressData.username}
                      />
                      <Typography
                        sx={{
                          position: "absolute",
                          right: 20,
                          top: "50%",
                          color: "#D1D5DB",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        @nodeless.io
                      </Typography>
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Username</Typography>
                    <Typography sx={styles.value}>
                      {nodelessAddressData?.username}@nodeless.io
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
                        Forward Emails to
                      </InputLabel>

                      <BootstrapInput
                        name="email"
                        required
                        fullWidth
                        size="small"
                        type="email"
                        onChange={handleChange}
                        value={nodelessAddressData.email}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Forward Emails to</Typography>

                    <Typography sx={styles.value}>
                      {nodelessAddressData?.email}
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
                        Fee
                      </InputLabel>

                      <BootstrapInput
                        name="price"
                        required
                        fullWidth
                        size="small"
                        type="number"
                        onChange={handleChange}
                        value={nodelessAddressData.price}
                        inputProps={{ min: "1000" }}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Fee</Typography>
                    <Typography sx={styles.value}>
                      {formatter(nodelessAddressData?.price)}
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
                        Nostr Npub (Optional)
                      </InputLabel>

                      <BootstrapInput
                        name="nostr_npub"
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={nodelessAddressData.nostr_npub}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Nostr Npub</Typography>
                    <Typography sx={styles.value}>
                      {renderNostrNpub(nodelessAddressData?.nostr_npub)}
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

        <Box
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <SmallScreenDeleteEmailModal />
        </Box>
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
  deleteButton: {
    color: "#E02424",
    textTransform: "none",
    textDecoration: "underline",
  },
  formItem: {
    marginBottom: "10px",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
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

export default NodelessAddressSettingsContent;
