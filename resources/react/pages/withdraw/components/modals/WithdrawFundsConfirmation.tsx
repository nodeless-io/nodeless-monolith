import React from "react";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import classes from "./styles.module.css";
import { formatter } from "../../../../utils/Utils";
import { useFetch } from "../../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

const WithdrawFundsConfirmation = () => {
  const {
    withdrawFundsRequest,
    setWithdrawFundsRequest,
    withdrawalSettings,
  } = React.useContext(WithdrawContext);

  const queryClient = useQueryClient();

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setWithdrawFundsRequest({
      ...withdrawFundsRequest,
      [event.target.name]: event.target.value,
    });
  };

  const goBack = () => {
    setWithdrawFundsRequest({
      ...withdrawFundsRequest,
      tab: 0,
    });
  };

  const withdrawByLightningAddress = async (payload) => {
    const response = await useFetch(
      `/withdrawal/lightning-address`,
      payload,
      "POST"
    );

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(withdrawByLightningAddress, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["withdrawals"]);
      queryClient.invalidateQueries(["withdrawal-metrics"]);
      queryClient.invalidateQueries(["dashboard"]);
      queryClient.invalidateQueries(["transactions"]);

      message.success("Withdrawal successful");
      setWithdrawFundsRequest({
        ...withdrawFundsRequest,
        tab: 2,
        withdrawResponse: data?.data,
      });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error withdrawing to address"
      );
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await mutateAsync({
      amount: withdrawFundsRequest.amount,
    });
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Box sx={{ width: "75%", margin: "30px auto 20px auto" }}>
        <Typography
          sx={{
            color: "#9CA3AF",
            textAlign: "center",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
          }}
        >
          You are withdrawing
        </Typography>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
            marginBottom: "7px",
          }}
        >
          <Typography
            sx={{
              color: "#9CA3AF",
              textAlign: "center",
              fontSize: {
                xs: "30px",
                md: "40px",
              },
              fontWeight: "600",
              marginRight: "5px",
            }}
          >
            {formatter(withdrawFundsRequest.amount)}
          </Typography>

          <Typography
            sx={{
              color: "#D1D5DB",
              textAlign: "center",
              fontSize: {
                xs: "30px",
                md: "40px",
              },
              fontWeight: "500",
            }}
          >
            SATS
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: "#9CA3AF",
            textAlign: "center",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Fee: {formatter(0.01 * withdrawFundsRequest.amount + 100)} SATS
        </Typography>

        {/* <Typography
          sx={{
            color: "#9CA3AF",
            textAlign: "center",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          through
        </Typography> */}

        {/* <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Button
            endIcon={<CloseIcon sx={{ color: "#6B7280" }} fontSize="small" />}
            sx={{
              color: "#4B5563",
              fontSize: {
                xs: "13px",
                md: "14px",
              },
              fontWeight: "600",
              textTransform: "unset",
              background: "#E5E7EB",
              borderRadius: "20px",
              padding: "7px 20px",
              "&:hover": {
                background: "#E5E7EB",
              },
            }}
          >
            {withdrawFundsRequest.type == "invoice"
              ? "Lightning Invoice"
              : "Lightning Address"}
          </Button>
        </Box> */}
      </Box>

      <Box sx={{ background: "#F9FAFB", padding: "40px", marginTop: "30px" }}>
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: {
              xs: "13px",
              md: "14px",
            },
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {withdrawFundsRequest.type == "invoice"
            ? "Enter the invoice URL here"
            : "Lightning Address"}
        </Typography>

        <Box sx={styles.formItem}>
          <TextField
            value={withdrawalSettings.lightning_address}
            variant="outlined"
            onChange={handleChange}
            type="text"
            autoFocus
            name="address"
            sx={styles.textfield}
            size="medium"
            InputProps={{
              classes: {
                notchedOutline: classes["input-border"],
                input: classes["input"],
              },
              inputProps: {
                min: "5000",
                max: "5000000",
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabel,
              },
              required: false,
            }}
          />
        </Box>
      </Box>

      <Box sx={styles.footer}>
        <SecondaryContainedButton
          text="Withdraw"
          styles={{
            width: "100%",
            height: {
              xs: "40px",
              md: "50px",
            },
          }}
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        />

        <Button variant="text" sx={styles.cancel} onClick={goBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  checkboxLabel: {
    color: "#4B5563",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
  },
  textfield: {
    width: "100%",
    color: "#6B7280",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    borderRadius: "8px",
    background: "white",
  },
  formItem: {
    margin: "25px 0 10px 0",
    width: "100%",
    position: "relative",
  },
  cancel: {
    width: "100%",
    marginTop: "20px",
    color: "#4B5563",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    textDecoration: "underline",
    fontWeight: "600",
    textTransform: "none",
    height: "45px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  footer: {
    width: {
      xs: "80%",
      md: "40%",
    },
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "30px",
    display: "block",
  },
};
export default WithdrawFundsConfirmation;
