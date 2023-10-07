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
} from "@mui/material";
import { StoreContext } from "../../../../contexts/store/StoreContext";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import DeleteStoreModal from "./modals/DeleteStoreModal";
import SmallScreenDeleteStoreModal from "./modals/SmallScreenDeleteStoreModal";

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

const StoreSettingsContent = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const { storeId } = useParams<{ storeId: string }>();

  const { store } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const [storeData, setStoreData] = React.useState({
    name: "",
    url: "",
    email: "",
  });

  React.useEffect(() => {
    setStoreData({
      name: store?.name || "",
      url: store?.url || "",
      email: store?.email || "",
    });
  }, [store]);

  const updateStoreSettings = async (payload) => {
    const response = await useFetch("/stores/" + storeId, payload, "PUT");

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setStoreData({
      ...storeData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateStoreSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries([`store-${storeId}`]);
      message.success("Settings saved successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error updating settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      ...storeData,
      settings: {
        text_color: store?.settings.text_color,
        highlight_color: store?.settings.highlight_color,
        bg_color: store?.settings.bg_color,
      },
    });
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>General Settings</Typography>

          <DeleteStoreModal uuid={store?.uuid} />
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
                      }}
                    >
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Store Name
                      </InputLabel>

                      <BootstrapInput
                        name="name"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={storeData.name}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Store Name</Typography>
                    <Typography sx={styles.value}>{storeData?.name}</Typography>
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
                        Store Website
                      </InputLabel>

                      <BootstrapInput
                        name="url"
                        required
                        fullWidth
                        size="small"
                        type="url"
                        onChange={handleChange}
                        value={storeData.url}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Store Website</Typography>
                    <Typography sx={styles.value}>{storeData?.url}</Typography>
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
                        Support Email
                      </InputLabel>

                      <BootstrapInput
                        name="email"
                        required
                        fullWidth
                        size="small"
                        type="email"
                        onChange={handleChange}
                        value={storeData.email}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Support Email</Typography>
                    <Typography sx={styles.value}>
                      {storeData?.email}
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
          <SmallScreenDeleteStoreModal uuid={store?.uuid} />
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
    fontSize: "14px",
    fontWeight: "600",
  },
  value: {
    color: "#FF7847",
    marginBottom: "15px",
    fontSize: "146x",
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
    padding: "3px 5px 1px 5px",
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

export default StoreSettingsContent;
