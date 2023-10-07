import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  Stack,
} from "@mui/material";
import AnonymousLogo from "../../assets/svg/anonymous.svg";
import { formatter } from "../../../utils/Utils";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";
import PublicDonationPageEmptyDonations from "./PublicDonationPageEmptyDonations";

const PublicDonationPageLatestDonations = () => {
  const { donations } = React.useContext(PublicDonationPageContext);

  return (
    <Grid item md={5} xs={12}>
      <Typography sx={styles.header}>Latest Donations</Typography>

      {donations.length > 0 ? (
        <List sx={styles.list}>
          {donations.map((donation, index) => (
            <Box key={index}>
              <Divider />

              <ListItem sx={styles.listItem}>
                <Box>
                  <img src={AnonymousLogo} alt="anonymous" />
                </Box>

                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={styles.name}>{donation.name}</Typography>

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={styles.amount}>
                      {formatter(donation.amount)}
                    </Typography>
                    <Typography sx={styles.currency}>SATS</Typography>
                  </Stack>
                </Stack>

                <Typography sx={styles.description}>
                  {donation.message}
                </Typography>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : (
        <PublicDonationPageEmptyDonations />
      )}
    </Grid>
  );
};

const styles = {
  description: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: "13px",
    letterSpacing: "0.01em",
    lineHeight: "150%",
    margin: "5px 0 10px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    lineClamp: 4,
    WebkitBoxOrient: "vertical",
  },
  name: {
    color: "#111928",
    fontSize: "16px",
    fontWeight: "600",
  },
  amount: {
    color: "#111928",
    fontSize: "14px",
    fontWeight: "600",
  },
  currency: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "5px",
  },
  list: {
    width: {
      xs: "100%",
      md: "80%",
    },
    marginBottom: {
      xs: "40px",
      md: "0px",
    },
  },
  header: {
    color: "#374151",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "20px",
    marginTop: {
      xs: "50px",
      md: "10px",
    },
    textAlign: {
      xs: "center",
      md: "left",
    },
  },
  listItem: {
    display: "block",
    marginTop: "10px",
    padding: {
      xs: "20px 15px",
    },
  },
};

export default PublicDonationPageLatestDonations;
