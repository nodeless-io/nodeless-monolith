import React from "react";
import { Box, Typography } from "@mui/material";
import SuccessIcon from "../../assets/svg/checkout-success.svg";
import ReactMarkdown from "react-markdown";
import { useFetch } from "../../../hooks/useFetch";

const PublicPaywallRequestSuccess = ({ paywallRequest }) => {
  React.useEffect(() => {
    (async () => {
      await useFetch(
        `/p/${paywallRequest?.paywall?.uuid}/paid/${paywallRequest?.paywallRequest?.uuid}`,
        {},
        "POST"
      );
    })();
  }, []);

  if (
    paywallRequest?.paywall?.type == "download" ||
    paywallRequest?.paywall?.type == "redirect"
  ) {
    window.location.href = paywallRequest?.paywall?.content;
  } else if (paywallRequest?.paywall?.type == "content") {
    return (
      <Box
        sx={{
          margin: "10px 0 20px 0",
        }}
      >
        <ReactMarkdown>{paywallRequest?.paywall?.content}</ReactMarkdown>
      </Box>
    );
  } else {
    return (
      <Box sx={styles.container}>
        <img src={SuccessIcon} />

        <Typography sx={styles.label}>Transaction Successful</Typography>
      </Box>
    );
  }
};

const styles = {
  container: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: "60px",
  },

  label: {
    color: "#374151",
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "18px",
    letterSpacing: "0.04em",
  },
};

export default PublicPaywallRequestSuccess;
