import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { APP_ROUTES } from "../../app.routes";
import { copyToClipboard } from "../../../utils/Utils";
import LinkIcon from "@mui/icons-material/Link";

const SinglePaywallLayoutHeader = () => {
  const { paywallId } = useParams();
  const publicLink = `${window.location.origin}/pw/${paywallId}`;
  return (
    <Box>
      <Button
        //@ts-ignore
        color="gray"
        component={Link}
        to={APP_ROUTES.PAYWALL_PAYWALLS}
        sx={{
          marginBottom: "20px",
        }}
      >
        <KeyboardBackspaceIcon color="inherit" />
      </Button>

      <Box sx={styles.header}>
        <Box sx={styles.headerInfo}>
          <Box sx={styles.headerIcon}>
            <LockIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Paywall</Typography>
        </Box>

        <Box sx={styles.linkContainer}>
          <Button
            component={Link}
            variant="text"
            to={publicLink}
            target="__blank"
            color="secondary"
            sx={styles.linkButton}
          >
            Public Link
          </Button>

          <IconButton
            onClick={() => copyToClipboard(publicLink)}
            sx={styles.copyIcon}
          >
            <LinkIcon sx={{ fontSize: "18px" }} color="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  copyIcon: {
    color: "#F04200",
    transform: "rotateY(0deg) rotate(135deg)",
    marginTop: "4px",
    "&:hover": {
      background: "transparent",
      color: "#B34116",
    },
  },
  linkContainer: {
    display: "flex",
    marginLeft: "20px",
  },
  linkButton: {
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

  selector: {
    display: {
      xs: "block",
      md: "none",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: {
      xs: "0px 20px",
    },
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },

  headerIcon: {
    background: "#FFECE3",
    borderRadius: "50%",
    height: {
      xs: "27px",
      md: "30px",
    },
    width: {
      xs: "27px",
      md: "30px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FF5A1F",
    padding: "2px",
    marginRight: "15px",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "25px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "-5px",
      md: "unset",
    },
  },
};

export default SinglePaywallLayoutHeader;
