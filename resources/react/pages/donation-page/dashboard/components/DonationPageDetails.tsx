import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";

import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import {
  formatDate,
  copyToClipboard,
  formatter,
} from "../../../../utils/Utils";
import { DonationPageMetricsContext } from "../../../../contexts/donation-page/DonationPageMetricsContext";

const DonationPageDetails = () => {
  const { donationPage } = React.useContext(DonationPageContext);
  const { metricsData } = React.useContext(DonationPageMetricsContext);

  const [publicLink, setPublicLink] = React.useState("");

  React.useEffect(() => {
    setPublicLink(`${window.location.origin}/donate/${donationPage?.slug}`);
  }, [donationPage]);

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          lg: "40%",
        },
        marginTop: {
          xs: "40px",
          md: "20px",
        },
      }}
    >
      <Box sx={styles.container}>
        <Typography sx={styles.name}>{donationPage?.name}</Typography>

        <Stack direction="row">
          <Button
            variant="text"
            component={Link}
            to={publicLink}
            sx={styles.publicLink}
            target="_blank"
          >
            Public link
          </Button>

          <IconButton
            onClick={() => copyToClipboard(publicLink)}
            sx={styles.copyIcon}
          >
            <LinkIcon sx={{ fontSize: "18px" }} color="inherit" />
          </IconButton>
        </Stack>

        <Typography sx={styles.description}>
          {donationPage?.description}
        </Typography>

        <Divider sx={{ margin: "15px 0" }} />

        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography sx={styles.value}>
              {formatter(metricsData?.total_donation_amount)} SATS
            </Typography>
            <Typography sx={styles.label}>Amount Raised</Typography>
          </Box>

          <Box>
            <Typography sx={styles.value}>
              {metricsData?.donation_count}
            </Typography>
            <Typography sx={styles.label}>Payments</Typography>
          </Box>

          <Box>
            <Typography sx={styles.value}>
              {formatDate(donationPage?.created_at, "MMM DD")}
            </Typography>
            <Typography sx={styles.label}>Date created</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

const styles = {
  value: {
    color: "#374151",
    fontWeight: "600",
    letterSpacing: "0.02em",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    textAlign: "center",
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "600",
    letterSpacing: "0.02em",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
  },
  container: {
    padding: {
      xs: "20px",
    },
  },
  name: {
    color: "#111928",
    fontSize: {
      xs: "18px",
      md: "20px",
    },
    fontWeight: "600",
    letterSpacing: "0.02em",
    marginLeft: "5px",
  },
  description: {
    color: "#9CA3AF",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    letterSpacing: "0.02em",
    marginLeft: {
      xs: "unset",
      md: "5px",
    },
    marginTop: "10px",
    lineHeight: "140%",
  },
  publicLink: {
    color: "#F04200",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    textDecoration: "underline",
    textTransform: "none",
    marginTop: "5px",
    borderRadius: "5px",
    "&:hover": {
      background: "#FFF6F1",
      color: "#FF5A1F",
    },
  },
  copyIcon: {
    color: "#F04200",
    transform: "rotateY(0deg) rotate(135deg)",
    marginTop: "4px",
    "&:hover": {
      background: "transparent",
      color: "#B34116",
    },
  },
};

export default DonationPageDetails;
