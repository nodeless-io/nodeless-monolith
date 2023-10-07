import React from "react";
import { Box, Skeleton } from "@mui/material";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";

const DonationPageImage = () => {
  const { donationPage } = React.useContext(DonationPageContext);

  return (
    <Box className="donation_page_image_container">
      {donationPage?.header_image ? (
        <img
          src={donationPage?.header_image}
          alt={donationPage?.name}
          className="donation_page_image"
          loading="eager"
        />
      ) : (
        <Skeleton variant="rectangular" className="donation_page_image" />
      )}
    </Box>
  );
};

export default DonationPageImage;
