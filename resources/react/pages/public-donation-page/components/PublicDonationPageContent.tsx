import React from "react";
import { Box, Grid } from "@mui/material";
import Logo from "../../components/logo/Logo";
import PublicDonationPageLatestDonations from "./PublicDonationPageLatestDonations";
import CreateDonationForm from "./CreateDonationForm";
import DonationDetails from "./DonationDetails";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";
import CreateDonationModal from "./CreateDonationModal";
import DonationPageLoader from "./DonationPageLoader";

const PublicDonationPageContent = () => {
  const { isLoading } = React.useContext(PublicDonationPageContext);

  if (isLoading) return <DonationPageLoader />;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.logo}>
        <Logo link={window.location.origin} />
      </Box>

      <CreateDonationModal />

      <Box sx={styles.content}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <DonationDetails />

            <CreateDonationForm />
          </Grid>

          <Grid item md={1} />

          <PublicDonationPageLatestDonations />
        </Grid>
      </Box>
    </Box>
  );
};

const styles = {
  logo: {
    padding: {
      xs: "30px 20px 10px 20px",
      sm: 0,
    },
  },
  container: {
    padding: {
      sm: "40px",
      md: "45px",
      lg: "50px",
    },
    width: "100vw",
    height: "100%",
    margin: "auto",
    background: "#F5F5F5",
  },
  content: {
    margin: {
      xs: "10px 0",
      sm: "20px 0",
      md: "50px 0",
    },
  },
};

export default PublicDonationPageContent;
