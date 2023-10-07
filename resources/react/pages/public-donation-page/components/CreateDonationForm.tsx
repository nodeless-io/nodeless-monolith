import React from "react";
import { Box, Typography } from "@mui/material";
import {
  CustomInput,
  CustomInputWithEndAdornment,
} from "../../components/custom-components/Input";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { message } from "antd";

const CreateDonationForm = () => {
  const { slug } = useParams();

  const {
    handleNewDonation,
    donationDetails,
    setDonationDetails,
  } = React.useContext(PublicDonationPageContext);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setDonationDetails({
      ...donationDetails,
      [event.target.name]: event.target.value,
    });
  };

  const createDonation = async (payload) => {
    return await useFetch(`/donation/${slug}/`, payload, "POST");
  };

  const { isLoading, mutateAsync } = useMutation(createDonation, {
    onSuccess: (data) => {
      handleNewDonation(data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error making donation");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mutateAsync({
      amount: donationDetails.amount,
      name: donationDetails.name,
      message: donationDetails.comment,
    });
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Box sx={styles.formContainer}>
        <Typography
          sx={{
            color: "#F04200",
            fontSize: "14px",
            fontWeight: "600",
            marginTop: {
              xs: "30px",
              sm: "unset",
            },
          }}
        >
          Donate
        </Typography>

        <Box sx={styles.form}>
          <CustomInputWithEndAdornment
            handleChange={handleChange}
            label="Amount"
            name="amount"
            value={donationDetails.amount}
            autoFocus
            type="number"
            required
            min="1000"
            endAdornment={
              <Typography
                sx={{ color: "#D1D5DB", fontSize: "16px", fontWeight: "600" }}
              >
                SATS
              </Typography>
            }
          />

          <CustomInput
            handleChange={handleChange}
            label="Name (Optional)"
            name="name"
            value={donationDetails.name}
            type="text"
          />

          <CustomInput
            handleChange={handleChange}
            label="Comment (Optional)"
            name="comment"
            value={donationDetails.comment}
            type="text"
            multiline
            rows={4}
          />
        </Box>
      </Box>

      <Box sx={styles.footer}>
        <SecondaryContainedButton
          text="Donate"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          styles={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};

const styles = {
  footer: {
    width: "90%",
    margin: "auto",
    marginTop: "40px",
  },
  formContainer: {
    marginTop: {
      xs: "50px",
      sm: "50px",
    },
    background: "white",
    padding: "30px",
    borderRadius: {
      xs: 0,
      sm: "10px",
    },
    boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.06)",
  },
  form: {
    marginTop: "30px",
    width: {
      xs: "100%",
      md: "80%",
    },
  },
};

export default CreateDonationForm;
