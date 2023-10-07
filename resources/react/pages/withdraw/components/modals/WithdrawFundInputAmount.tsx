import React from "react";
import {
  Typography,
  Box,
  TextField,
  Stack,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import classes from "./styles.module.css";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import { convertSATSToBTC } from "../../../../utils/helpers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";

const WithdrawFundInputAmount = () => {
  const {
    withdrawFundsRequest,
    setWithdrawFundsRequest,
    handleWithdrawFundsModalClose,
  } = React.useContext(WithdrawContext);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    if (event.target.name == "amount") {
      if (event.target.value <= 5000000) {
        setWithdrawFundsRequest({
          ...withdrawFundsRequest,
          amount: event.target.value,
        });
      }
    } else {
      setWithdrawFundsRequest({
        ...withdrawFundsRequest,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWithdrawFundsRequest({
      ...withdrawFundsRequest,
      tab: 1,
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
            marginBottom: "30px",
          }}
        >
          Please enter the amount you want to withdraw and select the mode of
          payment.
        </Typography>

        <Box sx={styles.formItem}>
          <TextField
            value={withdrawFundsRequest.amount || ""}
            variant="outlined"
            onChange={handleChange}
            placeholder="SATS"
            type="number"
            autoFocus
            name="amount"
            required
            sx={styles.textfield}
            size="medium"
            InputProps={{
              classes: {
                notchedOutline: classes["input-border"],
                input: classes["input"],
              },
              inputProps: {
                min: "1500",
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

          <Stack
            direction="row"
            sx={{ position: "absolute", top: 15, right: 20 }}
          >
            <Typography
              sx={{
                color: "#111928",
                fontSize: "16px",
                marginRight: "7px",
                fontWeight: "600",
              }}
            >
              {convertSATSToBTC(withdrawFundsRequest.amount)}
            </Typography>
            <Typography
              sx={{
                color: "#9CA3AF",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              BTC
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction="row"
          sx={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography
              sx={{
                color: "#374151",
                fontSize: {
                  xs: "13px",
                  md: "15px",
                },
                fontWeight: "600",
              }}
            >
              min:
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: {
                  xs: "13px",
                  md: "15px",
                },
                fontWeight: "600",
              }}
            >
              1,500
            </Typography>
          </Stack>

          <HorizontalRuleIcon
            sx={{
              transform: "rotate(-90deg)",
              WebkitTransform: "rotate(-90deg)",
              MozTransform: "rotate(-90deg)",
              msTransform: "rotate(-90deg)",
              OTransform: "rotate(-90deg)",
              filter:
                "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)",
            }}
          />

          <Stack direction="row" spacing={1}>
            <Typography
              sx={{ color: "#374151", fontSize: "15px", fontWeight: "600" }}
            >
              max:
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: "15px", fontWeight: "600" }}
            >
              5,000,000
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ background: "#F9FAFB", padding: "40px" }}>
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
          Please select one of these options
        </Typography>

        <FormControl sx={{ marginTop: "20px" }}>
          <RadioGroup
            defaultValue={withdrawFundsRequest.type}
            value={withdrawFundsRequest.type}
            onChange={null}
          >
            <FormControlLabel
              value="address"
              control={
                <Radio
                  color="secondary"
                  onClick={() => {
                    setWithdrawFundsRequest({
                      ...withdrawFundsRequest,
                      type: "address",
                    });
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: "#4B5563",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Lightning Address
                </Typography>
              }
            />

            <FormControlLabel
              value="invoice"
              sx={{ cursor: "not-allowed" }}
              control={<Radio color="secondary" onClick={() => null} />}
              label={
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography
                    sx={{
                      color: "#D1D5DB",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "not-allowed",
                    }}
                  >
                    Lightning Invoice
                  </Typography>

                  <Box
                    sx={{
                      marginLeft: "15px",
                      fontSize: "12px",
                      color: "white",
                      background: "#6B7280",
                      borderRadius: "20px",
                      padding: "3px 15px",
                      fontWeight: "600",
                    }}
                  >
                    coming soon
                  </Box>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
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
        />

        <Button
          variant="text"
          sx={styles.cancel}
          onClick={handleWithdrawFundsModalClose}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  cancel: {
    width: "100%",
    marginTop: "20px",
    color: "#4B5563",
    fontSize: "14px",
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

    display: "block",
    margin: "auto",
    marginTop: "30px",
  },
  textfield: {
    width: "100%",
    color: "#6B7280",
    fontSize: "14px",
    borderRadius: "8px",
  },
  formItem: {
    margin: "25px 0 10px 0",
    width: "100%",
    position: "relative",
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
  title: {
    textAlign: "center",
    color: "#FF5A1F",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "100%",
    marginBottom: "10px",
  },
  tableItem: {
    color: "#6B7280",
    letterSpacing: "0.04em",
    fontSize: "14px",
    fontWeight: "600",
  },
  paperProps: {
    borderRadius: {
      xs: 0,
      md: "12px",
    },
    padding: "10px",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(4px)",
  },
};

export default WithdrawFundInputAmount;
