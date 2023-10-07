import React from "react";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../../../../contexts/user/UserContext";

const EmptyAPITokens = () => {
  const { setCreateAPITokenModal } = React.useContext(UserContext);

  return (
    <Box sx={styles.content}>
      <Box sx={{ justifyContent: "center" }}>
        <Typography sx={styles.label}>No API tokens created yet</Typography>

        <Typography sx={styles.description}>
          Please generate an API Token{" "}
          <span role="link" onClick={() => setCreateAPITokenModal(true)}>
            here
          </span>
        </Typography>
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
    marginTop: "120px",
    marginBottom: "150px",
  },

  label: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "700",
    marginTop: "30x",
    marginBottom: "20px",
  },
  description: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "150%",
    letterSpacing: "0.01em",
    fontWeight: "600",
    "& span": {
      color: "#FF5A1F",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
};

export default EmptyAPITokens;
