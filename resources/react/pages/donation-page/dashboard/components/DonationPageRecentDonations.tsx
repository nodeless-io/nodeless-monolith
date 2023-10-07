import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  Switch,
} from "@mui/material";
import { DonationPageIndexContext } from "../../../../contexts/donation-page/DonationsPageIndexContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DonationPageDonationItem from "./DonationPageDonationItem";
import DonationsLoader from "./DonationsLoader";
import EmptyDonations from "./EmptyDonations";

const DonationPageRecentDonations = () => {
  const { donations, isLoading, currentTab, setCurrentTab } = React.useContext(
    DonationPageIndexContext
  );

  const [open, setOpen] = React.useState(true);

  const handleToggle = () => {
    if (currentTab == "paid") {
      setCurrentTab("unpaid");
    } else {
      setCurrentTab("paid");
    }
  };

  if (isLoading) {
    return <DonationsLoader />;
  }

  if (!isLoading && donations?.length < 1) {
    return <EmptyDonations />;
  }

  return (
    <Box sx={styles.container}>
      {!open && (
        <Stack direction="row" sx={styles.closedContainer}>
          <Typography sx={styles.headerText}>Recent Donations</Typography>

          <IconButton onClick={() => setOpen(true)}>
            <ExpandMoreIcon />
          </IconButton>
        </Stack>
      )}

      {open && (
        <>
          <Stack direction="row" sx={styles.openContainer}>
            <Typography sx={styles.headerText}>Recent Donations</Typography>

            <IconButton onClick={() => setOpen(false)}>
              <ExpandLessIcon />
            </IconButton>
          </Stack>

          <Box sx={styles.showExpired}>
            <Typography sx={styles.showExpiredText}>Show Unpaid</Typography>
            <Switch
              size="small"
              color="secondary"
              value={currentTab === "paid"}
              onClick={handleToggle}
            />
          </Box>

          <Grid
            container
            spacing={4}
            sx={{
              marginTop: "10px",
              padding: {
                xs: "20px",
                md: "unset",
              },
            }}
          >
            {donations &&
              donations.map((donation) => (
                <DonationPageDonationItem
                  donation={donation}
                  key={donation.uuid}
                />
              ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

const styles = {
  showExpired: {
    display: "flex",
    alignItems: "right",
    width: "100%",
    float: "right",
    marginTop: "20px",
    justifyContent: "flex-end",
  },
  showExpiredText: {
    color: "#6B7280",
    letterSpacing: "0.04em",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "20px",
    marginRight: "10px",
  },

  container: {
    marginTop: "50px",
  },
  closedContainer: {
    justifyContent: "space-between",
    width: "100%",
    border: "1px solid #E5E7EB",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "10px",
  },
  openContainer: {
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid #E5E7EB",
    alignItems: "center",
    padding: "10px 20px",
  },
  headerText: {
    color: "#1F2A37",
    fontSize: "14px",
    letterSpacing: "0.04em",
    fontWeight: "600",
  },
};

export default DonationPageRecentDonations;
