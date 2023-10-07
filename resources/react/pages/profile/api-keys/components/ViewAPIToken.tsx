import React from "react";
import { IconButton, Button, Box, Typography, Stack } from "@mui/material";
import { UserContext } from "../../../../contexts/user/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { copyToClipboard } from "../../../../utils/Utils";

const ViewAPIToken = () => {
  const {
    token,
    setViewAPITokenModal,
    viewAPITokenModal,
    setToken,
  } = React.useContext(UserContext);

  const handleClose = () => {
    setViewAPITokenModal(false);
    setToken("");
  };

  return viewAPITokenModal ? (
    <Box
      sx={{
        background: "#FF7847",
        display: "flex",
        color: "white",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",

        margin: "20px 0",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
        Your API token: {token}
      </Typography>

      <Stack direction="row">
        <Button
          color="secondary"
          onClick={() => copyToClipboard(token, "Token copied to clipboard")}
        >
          <ContentCopyIcon sx={{ color: "white" }} />
        </Button>

        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  ) : (
    <Box />
  );
};

export default ViewAPIToken;
