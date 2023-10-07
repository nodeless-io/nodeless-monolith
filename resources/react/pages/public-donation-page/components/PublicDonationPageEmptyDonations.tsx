import React from "react";
import { Box } from "@mui/material";
import EmptyDonations from "../../assets/svg/empty-donations.svg";

const PublicDonationPageEmptyDonations = () => {
  return (
    <Box sx={styles.content}>
      <Box sx={{ justifyContent: "center" }}>
        <img src={EmptyDonations} />
      </Box>
    </Box>
  );
};

const styles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginTop: "100px",
    marginBottom: "150px",
  },
};

export default PublicDonationPageEmptyDonations;
