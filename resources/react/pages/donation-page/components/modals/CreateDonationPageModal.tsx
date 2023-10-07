import * as React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  InputLabel,
  IconButton,
  FormControl,
} from "@mui/material";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";
import useScreenSize from "../../../../hooks/useScreenSize";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, styled } from "@mui/material/styles";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import { useFetchWithFile } from "../../../../hooks/useFetch";
import { useMutation, useQueryClient } from "react-query";
import FileUpload from "../../../components/custom-components/FileUpload";
import { message } from "antd";
import { extractString, toKebabCase } from "../../../../utils/helpers";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "5px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FF5A1F",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    width: "100%",
    padding: "10px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "25px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#D1D5DB",
    },
  },
}));

export default function CreateDonationPageModal() {
  const {
    createDonationPageModalOpen,
    setCreateDonationPageModalOpen,
  } = React.useContext(DonationPageContext);

  const handleClose = () => {
    setCreateDonationPageModalOpen(false);
  };

  const { isSmallScreen } = useScreenSize();
  const initialState = {
    name: "",
    slug: "",
    description: "",
    isChecked: false,
  };
  const [state, setState] = React.useState(initialState);
  const [file, setFile] = React.useState(null);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();

  const createDonationPage = async (payload) => {
    const response = await useFetchWithFile(`/donation_page`, payload);

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createDonationPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["donation_pages"]);
      setState(initialState);

      setCreateDonationPageModalOpen(false);
      message.success("Donation page created successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error creating donation page"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      message.warning("Image has not  been selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("slug", state.slug);
    formData.append("description", state.description);
    formData.append("header_image", file);
    formData.append("settings[]", "'#FFFFFF'");

    await mutateAsync(formData);
  };

  return (
    <Dialog
      open={createDonationPageModalOpen}
      fullScreen={isSmallScreen}
      scroll={"paper"}
      PaperProps={{
        sx: styles.paperProps,
      }}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        style: styles.background,
      }}
    >
      <DialogTitle sx={styles.title}>
        New Donation Page
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.smallCloseButton}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="close" onClick={handleClose} sx={styles.close}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent sx={styles.content}>
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <FileUpload file={file} setFile={setFile} />

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                htmlFor="name"
                //@ts-ignore
                color="black"
                sx={styles.textFieldLabel}
              >
                Give your Donation page a title
              </InputLabel>

              <BootstrapInput
                id="name"
                name="name"
                autoFocus
                required
                fullWidth
                size="small"
                type="text"
                onChange={handleChange}
                value={state.name}
                onBlur={() => {
                  setState({
                    ...state,
                    slug: toKebabCase(state.name),
                  });
                }}
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                htmlFor="description"
                //@ts-ignore
                color="black"
                sx={styles.textFieldLabel}
              >
                Write a short description
              </InputLabel>

              <BootstrapInput
                id="name"
                name="description"
                required
                fullWidth
                size="small"
                type="text"
                onChange={handleChange}
                value={state.description}
                rows={4}
                multiline
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                htmlFor="description"
                //@ts-ignore
                color="black"
                sx={styles.textFieldLabel}
              >
                Slug
              </InputLabel>

              <BootstrapInput
                id="name"
                name="slug"
                required
                fullWidth
                size="small"
                type="text"
                onChange={(event) => {
                  setState({
                    ...state,
                    slug: extractString(
                      event.target.value.replace(/\s/g, ""),
                      "[0-9a-zA-Z-]+"
                    ),
                  });
                }}
                value={state.slug}
                autoComplete="nickname"
                inputProps={{
                  maxLength: 30,
                }}
              />
            </FormControl>
          </Box>

          <Box sx={styles.footer}>
            <SecondaryContainedButton
              text="Add Campaign"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              styles={{ width: "100%" }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const styles = {
  footer: {
    marginTop: "50px",
    width: "100%",
  },
  checkboxLabel: {
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "5px",
  },
  uploadButton: {
    width: "100%",
    height: "150px",
    border: "1px solid #D1D5DB",
    textTransform: "none",
    "&:hover": {
      background: "#E5E7EB",
    },
    marginBottom: "30px",
  },
  title: {
    textAlign: "center",
    color: "#1F2A37",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
  },

  paperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },
    padding: "10px",
    minHeight: "100vh",
    maxHeight: "100vh",
    zIndex: 1,
  },

  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    color: "#374151",
    display: {
      xs: "none",
      md: "block",
    },
  },
  smallCloseButton: {
    position: "absolute",
    left: 10,
    top: 12,
    color: "#374151",
    display: {
      md: "none",
      xs: "block",
    },
  },
  content: {
    marginTop: {
      xs: "30px",
      md: "10px",
    },
    width: {
      xs: "100%",
      md: "unset",
    },
  },
  formItem: {
    marginBottom: "20px",
    width: "100%",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "18px",
    color: "#1F2A37",
  },
};
