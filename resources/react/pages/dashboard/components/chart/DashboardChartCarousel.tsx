import * as React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import NodelessAddressIcon from "../../../assets/svg/dashboard/nodeless-address.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { APP_ROUTES } from "../../../app.routes";
import { Link, useNavigate } from "react-router-dom";

const ITEMS = [
  {
    icon: NodelessAddressIcon,
    label: "Nodeless Address",
    topic:
      "Earn revenue and eliminate spam from your email by routing messages to our new Nodeless address",
    text:
      "Your audience pay a little fee before they can have access to you via email with our nodeless address.",
    url: APP_ROUTES.NODELESS_ADDRESS_INDEX,
  },
];

const DashboardChartCarousel = () => {
  const navigate = useNavigate();

  return (
    <Box className="chart-container-section-two">
      {ITEMS.map((item, index) => (
        <Box key={index}>
          <Box sx={styles.carouselLargeScreen}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={styles.pill}
                component={Link}
                to={APP_ROUTES.NODELESS_ADDRESS_INDEX}
              >
                {item.label}
              </Button>

              <img src={item.icon} />
            </Stack>

            <Box sx={styles.container}>
              <Typography sx={styles.topic}>{item.topic}</Typography>

              <Typography sx={styles.text}>{item.text}</Typography>

              <Button
                endIcon={<KeyboardArrowRightIcon />}
                sx={styles.button}
                component={Link}
                to={item.url}
              >
                Get started
              </Button>
            </Box>
          </Box>

          <Box
            sx={styles.carouselSmallScreen}
            onClick={() => navigate(item.url)}
          >
            <Box sx={{ padding: "20px" }}>
              <Typography
                sx={{ color: "#FFC5AD", fontWeight: "600", fontSize: "14px" }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: "13px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  lineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  marginTop: "15px",
                }}
              >
                {item.topic}
              </Typography>
            </Box>

            <img src={item.icon} className="carousel-icon" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const styles = {
  pill: {
    background: "#FF7847",
    borderRadius: "20px",
    color: "white",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontSize: "14px",
    padding: "5px 25px",
    fontWeight: "600",
    textTransform: "none",
    "&:hover": {
      background: "#FF7847",
      color: "white",
    },
  },
  container: {
    padding: "20px",
  },
  topic: {
    marginBottom: "10px",
    color: "white",
    fontSize: "16px",
    fontWeight: "800",
    lineHeight: "160%",
    letterSpacing: "0.04em",
  },
  text: {
    marginBottom: "10px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "160%",
    opacity: "0.7",
    letterSpacing: "0.04em",
  },
  button: {
    textTransform: "none",
    color: "#FFC5AD",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
      color: "#FFC5AD",
    },
  },
  carouselLargeScreen: {
    display: {
      xs: "none",
      md: "block",
    },
  },
  carouselSmallScreen: {
    display: {
      md: "none",
      xs: "flex",
    },
    width: "100%",
    justifyContent: "space-between",
    // alignItem: "center",
    // padding: "10px",
  },
};

export default DashboardChartCarousel;
