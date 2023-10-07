import React from "react";
import { Box, Typography } from "@mui/material";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";
import DefaultDonationPageImage from "../../assets/svg/donation-page.svg";

const DonationDetails = () => {
  const { donationPage } = React.useContext(PublicDonationPageContext);

  return (
    <Box>
      <Box sx={styles.imageContainer}>
        <img
          src={donationPage?.header_image || DefaultDonationPageImage}
          alt={"donationPage?.name"}
          style={styles.image}
        />
      </Box>

      <Box sx={styles.details}>
        <Typography sx={styles.title}>{donationPage?.name}</Typography>

        <Typography sx={styles.description}>
          {donationPage?.description}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  details: {
    background: "linear-gradient(44.39deg, #911F8E 8.03%, #FD7014 91.23%)",
    boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.06)",
    borderRadius: {
      xs: 0,
      sm: "0 0 12px 12px",
    },
    padding: "20px",
  },
  title: {
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  description: {
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "150%",
    letterSpacing: "0.02em",
  },
  imageContainer: {
    height: "200px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: {
      xs: 0,
      sm: "12px 12px 0 0",
    },
  },
  image: {
    width: "100%",
    minWidth: "100%",
    minHeight: "100%",
  },
};

export default DonationDetails;
