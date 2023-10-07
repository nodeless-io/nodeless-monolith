import * as React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
} from "@mui/material";
import { PaywallContext } from "../../../../contexts/paywall/PaywallContext";
import { PaywallIndexContext } from "../../../../contexts/paywall/PaywallIndexContext";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import { useFetch } from "../../../../hooks/useFetch";
import { useMutation, useQueryClient } from "react-query";
import Modal from "../../../components/custom-components/Modal";
import { message } from "antd";
import { CustomInput, CustomInputWithEndAdornment } from "./CustomInput";
import { alpha, styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { PaywallTypes } from "../constants";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
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
    padding: "5px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "30px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#FF956B",
    },
  },
}));

export default function EditPaywallModal() {
  const { editPaywallModal, setEditPaywallModal } = React.useContext(
    PaywallContext
  );
  const { currentPaywall } = React.useContext(PaywallIndexContext);

  const queryClient = useQueryClient();

  const initialState = {
    name: currentPaywall.name,
    type: currentPaywall.type,
    price: currentPaywall.price,
    uuid: currentPaywall.uuid,
  };

  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    setState({
      name: currentPaywall.name,
      type: currentPaywall.type,
      price: currentPaywall.price,
      uuid: currentPaywall.uuid,
    });
  }, [currentPaywall]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      type: event.target.value,
    });
  };

  const createPaywall = async (payload) => {
    const response = await useFetch(
      `/paywall/uuid/${state.uuid}`,
      payload,
      "PUT"
    );

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createPaywall, {
    onSuccess: () => {
      queryClient.invalidateQueries(["paywalls"]);
      setState(initialState);

      setEditPaywallModal(false);
      message.success("Paywall updated successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error updating paywall");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      name: state.name,
      price: state.price,
      type: state.type,
      settings: {
        "": "",
      },
    };

    await mutateAsync(payload);
  };

  return (
    <Modal
      handleClose={() => setEditPaywallModal(false)}
      open={editPaywallModal}
      title="Edit Paywall"
    >
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={styles.formContainer}
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
              <span style={{ marginLeft: "5px", color: "red" }}>*</span>{" "}
            </InputLabel>

            <Select
              onChange={handleSelectChange}
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

        <CustomInputWithEndAdornment
          handleChange={handleChange}
          label="Price"
          name="price"
          value={state.price}
          type="number"
          required
          endAdornment={
            <Typography
              sx={{
                color: "#9CA3AF",
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                fontWeight: "600",
              }}
            >
              SATS
            </Typography>
          }
        />

        <Box sx={styles.footer}>
          <SecondaryContainedButton
            text="Edit Paywall"
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            styles={{ width: "100%" }}
          />
        </Box>
      </Box>
    </Modal>
  );
}

const styles = {
  formContainer: {
    marginTop: "10px",
  },
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
    fontSize: "16px",
    color: "#6B7280",
  },
};
