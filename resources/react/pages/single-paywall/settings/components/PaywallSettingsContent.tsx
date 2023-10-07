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
  Select,
  MenuItem,
} from "@mui/material";
import { SinglePaywallContext } from "../../../../contexts/paywall/SinglePaywallContext";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { alpha, styled } from "@mui/material/styles";
import DeletePaywallModal from "./modals/DeletePaywallModal";
import SmallScreenDeletePaywallModal from "./modals/SmallScreenDeletePaywallModal";
import { PaywallTypes } from "../../components/constants";
import { capitalizeWord } from "../../../../utils/Utils";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import ReactMarkdown from "react-markdown";

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

const PaywallSettingsContent = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const { paywallId } = useParams<{ paywallId: string }>();

  const { paywall } = React.useContext(SinglePaywallContext);
  const queryClient = useQueryClient();

  const [content, setContent] = React.useState("");
  const [paywallData, setPaywallData] = React.useState({
    name: "",
    type: "",
    price: "",
    link: "",
  });

  React.useEffect(() => {
    setPaywallData({
      name: paywall?.name,
      type: paywall?.type,
      price: paywall?.price,
      link: paywall?.content,
    });
    setContent(paywall?.content);
  }, [paywall]);

  const updatePaywallSettings = async (payload) => {
    const response = await useFetch(
      `/paywall/uuid/${paywallId}`,
      payload,
      "PUT"
    );

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setPaywallData({
      ...paywallData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation(updatePaywallSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries([`paywalls`, `paywall-${paywallId}`]);
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

    let payload: any = {
      name: paywallData?.name,
      type: paywallData?.type,
      price: paywallData?.price,
      settings: {},
    };

    if (paywallData.type == "redirect" || paywallData.type == "download") {
      payload.content = paywallData.link;
    } else {
      payload.content = content;
    }

    await mutateAsync(payload);
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>General Settings</Typography>

          <DeletePaywallModal uuid={paywallId} />
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
                        sx={styles.textFieldLabel}
                      >
                        Name{" "}
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          *
                        </span>{" "}
                      </InputLabel>

                      <BootstrapInput
                        name="name"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        type="text"
                        onChange={handleChange}
                        value={paywallData.name}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Name</Typography>

                    <Typography sx={styles.value}>
                      {paywallData?.name}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    <FormControl variant="standard" sx={{ width: "90%" }}>
                      <InputLabel
                        shrink
                        //@ts-ignore
                        color="gray"
                        sx={styles.textFieldLabel}
                      >
                        Type{" "}
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          *
                        </span>{" "}
                      </InputLabel>

                      <Select
                        onChange={(event) => {
                          setPaywallData({
                            ...paywallData,
                            type: event.target.value,
                          });
                        }}
                        value={paywallData.type}
                        input={<BootstrapInput />}
                        size="small"
                      >
                        {PaywallTypes.map((type, index) => (
                          <MenuItem key={index} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Type</Typography>
                    <Typography sx={styles.value}>
                      {capitalizeWord(paywallData?.type)}
                    </Typography>
                  </>
                )}

                <Divider sx={styles.divider} />
              </Box>

              <Box>
                {isEditable ? (
                  <Box sx={styles.formItem}>
                    {paywallData?.type == "redirect" ||
                    paywallData?.type == "download" ? (
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
                          Link{" "}
                          <span style={{ marginLeft: "5px", color: "red" }}>
                            *
                          </span>{" "}
                        </InputLabel>

                        <BootstrapInput
                          name="link"
                          required
                          fullWidth
                          size="small"
                          type="url"
                          onChange={handleChange}
                          value={paywallData.link}
                        />
                      </FormControl>
                    ) : (
                      <Box sx={{ margin: "10px 0 70px 0", width: "90%" }}>
                        <Typography
                          sx={{ ...styles.textFieldLabel, fontSize: "12px" }}
                        >
                          Content{" "}
                          <span style={{ marginLeft: "5px", color: "red" }}>
                            *
                          </span>
                        </Typography>

                        <div data-color-mode="light">
                          <MDEditor
                            value={content}
                            onChange={(val) => {
                              setContent(val!);
                            }}
                            previewOptions={{
                              rehypePlugins: [[rehypeSanitize]],
                            }}
                          />
                        </div>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>
                      {paywallData?.type == "redirect" ||
                      paywallData?.type == "download"
                        ? "Link"
                        : "Content"}
                    </Typography>

                    {paywallData?.type == "redirect" ||
                    paywallData?.type == "download" ? (
                      <Typography sx={styles.value}>
                        {paywallData?.link}
                      </Typography>
                    ) : (
                      <Box sx={{ margin: "10px 0 20px 0" }}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </Box>
                    )}
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
                        Price{" "}
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          *
                        </span>{" "}
                      </InputLabel>

                      <BootstrapInput
                        name="price"
                        required
                        fullWidth
                        size="small"
                        type="number"
                        onChange={handleChange}
                        value={paywallData.price}
                      />
                    </FormControl>
                  </Box>
                ) : (
                  <>
                    <Typography sx={styles.label}>Price</Typography>
                    <Typography sx={styles.value}>
                      {paywallData?.price}
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
          <SmallScreenDeletePaywallModal uuid={paywallId} />
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

export default PaywallSettingsContent;
