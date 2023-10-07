import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  InputBase,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";
import { useParams } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import { useFetchWithFile } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import DeleteDonationPageModal from "./modals/DeleteDonationPageModal";
import SmallScreenDeleteDonationPageModal from "./modals/SmallScreenDeleteDonationPageModal";
import FileUpload from "../../../components/custom-components/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

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

const DonationPageSettingsContent = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const { donationPageId } = useParams<{ donationPageId: string }>();

  const { donationPage } = React.useContext(DonationPageContext);
  const queryClient = useQueryClient();

  const [donationPageData, setDonationPageData] = React.useState({
    name: "",
    slug: "",
    description: "",
    header_image: "",
  });
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    setDonationPageData({
      name: donationPage?.name,
      slug: donationPage?.slug,
      description: donationPage?.description,
      header_image: donationPage?.header_image,
    });
  }, [donationPage]);

  const updateDonationPageSettings = async (payload) => {
    const response = await useFetchWithFile(
      "/donation_page/" + donationPageId,
      payload,
      "POST"
    );

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setDonationPageData({
      ...donationPageData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updateDonationPageSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries([`donation-page-${donationPageId}`]);
      message.success("Settings saved successfully");
      // window.location.href = `${APP_ROUTES.DONATIONS}/settings/${donationPageId}/${donationPageData.slug}`;
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error updating settings"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", donationPageData.name);
    formData.append("slug", donationPageData.slug);
    formData.append("description", donationPageData.description);
    formData.append("header_image", file);
    formData.append("settings[]", "");

    await mutateAsync(formData);
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>General Settings</Typography>

          <DeleteDonationPageModal uuid={donationPage?.uuid} />
        </Grid>

        <Grid item xs={12} md={8}>
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
                {isEditable && (
                  <Box>
                    <InputLabel
                      shrink
                      //@ts-ignore
                      color="gray"
                      sx={styles.textFieldLabel}
                    >
                      Donation Page Image
                    </InputLabel>

                    {donationPageData?.header_image ? (
                      <Box sx={{ marginBottom: "20px" }}>
                        <img
                          src={donationPageData?.header_image}
                          alt="Donation Page Image"
                          className="uploaded-image"
                        />

                        <Box sx={{ ...styles.footer, marginTop: "20px" }}>
                          <Tooltip title="Remove Image">
                            <IconButton
                              size="small"
                              onClick={() =>
                                setDonationPageData({
                                  ...donationPageData,
                                  header_image: "",
                                })
                              }
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    ) : (
                      <FileUpload file={file} setFile={setFile} />
                    )}

                    <Divider sx={styles.divider} />
                  </Box>
                )}

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
                        Donation Page Title
                      </InputLabel>

                      <BootstrapInput
                        name="name"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={donationPageData.name}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>
                      Donation Page Title
                    </Typography>

                    <Typography sx={styles.value}>
                      {donationPageData?.name}
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
                        Slug
                      </InputLabel>

                      <BootstrapInput
                        name="slug"
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={donationPageData.slug}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Slug</Typography>
                    <Typography sx={styles.value}>
                      {donationPageData?.slug}
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
                        Description
                      </InputLabel>

                      <BootstrapInput
                        name="description"
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={donationPageData.description}
                        multiline
                        rows={4}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Description</Typography>
                    <Typography sx={styles.value}>
                      {donationPageData?.description}
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
          <SmallScreenDeleteDonationPageModal uuid={donationPage?.uuid} />
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
      xs: "14px",
      sm: "14px",
      md: "15px",
      lg: "16px",
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
      xs: "14px",
      md: "15px",
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

export default DonationPageSettingsContent;
