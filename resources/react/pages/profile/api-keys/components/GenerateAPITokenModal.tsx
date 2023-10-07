import * as React from "react";
import {
  Box,
  InputBase,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { alpha, styled } from "@mui/material/styles";
import Modal from "../../../components/custom-components/Modal";
import { useMutation, useQueryClient } from "react-query";
import { UserContext } from "../../../../contexts/user/UserContext";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FF5A1F",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #FF5A1F",
    fontSize: "14px",
    width: "100%",
    padding: "10px 15px",
    marginTop: "10px",
    color: "#4B5563",
    height: "15px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#FF5A1F",
    },
  },
}));

const GenerateAPITokenModal = () => {
  const {
    createAPITokenModal,
    setCreateAPITokenModal,
    setToken,
    setViewAPITokenModal,
  } = React.useContext(UserContext);

  const handleClose = () => {
    setCreateAPITokenModal(false);
  };

  const [state, setState] = React.useState({
    name: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();

  const generateAPIToken = async (payload) => {
    const response = await useFetch("/user/api-tokens", payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(generateAPIToken, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["api-tokens"]);

      setState({
        name: "",
      });
      setToken(data.token);
      handleClose();
      message.success(`API token generated successfully!`);
      setViewAPITokenModal(true);
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error generating API token"
      );
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutateAsync(state);
  };

  return (
    <React.Fragment>
      <Modal
        handleClose={handleClose}
        open={createAPITokenModal}
        title="Generate API Key"
        maxWidth="sm"
      >
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={styles.formItem}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel
                shrink
                htmlFor="url"
                color="secondary"
                sx={styles.textFieldLabel}
              >
                Label
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
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
            }}
          >
            <Button
              sx={{
                background: "#FF5A1F",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                width: "150px",
                height: "40px",
                textTransform: "none",
                "&:hover": {
                  background: "#FF5A1F",
                  color: "white",
                },
              }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Generate"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const styles = {
  formContainer: {
    marginTop: "10px",
  },
  formItem: {
    marginBottom: "10px",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#FF5A1F",
  },
};

export default GenerateAPITokenModal;
