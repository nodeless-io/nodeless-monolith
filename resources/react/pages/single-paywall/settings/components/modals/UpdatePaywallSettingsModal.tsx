import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputBase,
  InputLabel,
  FormControl,
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
import { useParams } from "react-router-dom";
import { PaywallTypes } from "../../../components/constants";
import { alpha, styled } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

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

const UpdatePaywallSettingsModal = ({ paywall }: any) => {
  const [open, setOpen] = React.useState(false);
  const { paywallId } = useParams<{ paywallId: string }>();

  const [state, setState] = React.useState({
    name: "",
    type: "",
    price: "",
    content: "",
  });
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    setState({
      name: paywall?.name,
      type: paywall?.type,
      price: paywall?.price,
      content: paywall?.content,
    });
    setContent(paywall?.content);
  }, [paywall]);

  const queryClient = useQueryClient();

  const updatePaywallSettings = async (payload) => {
    const response = await useFetch(
      `/paywall/uuid/${paywallId}`,
      payload,
      "PUT"
    );

    return response;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
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
      name: state.name,
      price: state.price,
      type: state.type,
      settings: {},
    };

    if (state.type == "redirect" || state.type == "download") {
      payload.content = state.content;
    } else {
      payload.content = content;
    }

    await mutateAsync(payload);
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
        title="Edit Paywall"
      >
        <Box
          component="form"
          sx={styles.formContainer}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CustomInput
            handleChange={handleChange}
            label="Name"
            name="name"
            value={state.name}
            autoComplete="name"
            type="text"
            required
          />

          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                //@ts-ignore
                color="gray"
                sx={styles.textFieldLabel}
              >
                Type
              </InputLabel>

              <Select
                onChange={(event) => {
                  setState({
                    ...state,
                    type: event.target.value,
                  });
                }}
                value={state.type}
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

          {(state.type == "download" || state.type == "redirect") && (
            <CustomInput
              handleChange={handleChange}
              label="Link"
              name="content"
              value={state.content}
              autoComplete="url"
              type="url"
              required
            />
          )}

          {state.type == "content" && (
            <Box sx={{ margin: "10px 0 20px 0" }}>
              <Typography sx={{ ...styles.textFieldLabel, fontSize: "12px" }}>
                Content
                <span style={{ marginLeft: "5px", color: "red" }}>*</span>
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

          <CustomInput
            handleChange={handleChange}
            label="Price"
            name="price"
            value={state.price}
            type="number"
          />

          <Box sx={styles.footer}>
            <SecondaryContainedButton
              text="Save"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              styles={styles.saveButton}
            />

            <SecondaryOutlinedButton
              text="Cancel"
              onClick={() => setOpen(false)}
              styles={styles.cancelButton}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#9CA3AF",
  },
  formItem: {
    marginBottom: "40px",
    width: "100%",
  },
  formContainer: {
    marginTop: "30px",
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

export default UpdatePaywallSettingsModal;
