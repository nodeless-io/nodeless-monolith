import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DisableTwoFactorModal from "./DisableTwoFactorModal";
import { UserContext } from "../../../../contexts/user/UserContext";

const Item = styled(Paper)(() => ({
  backgroundColor: "#F7F7F7",
  padding: "30px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#1F2A37",
  "&:hover": {
    color: "#FF7847",
  },
}));

const DisableTwoFactor = () => {
  const { setDisable2faModalOpen } = React.useContext(UserContext);

  return (
    <Item elevation={0} onClick={() => setDisable2faModalOpen(true)}>
      <DisableTwoFactorModal />

      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={styles.header} color="inherit">
            Disable 2FA
          </Typography>
          <Typography sx={styles.label}>
            This automatically disconnects your current authenticator app
          </Typography>
        </Box>

        <KeyboardArrowRightIcon
          sx={{
            marginLeft: "20px",
          }}
        />
      </Stack>
    </Item>
  );
};

const styles = {
  header: {
    marginBottom: "15px",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    "&:hover": {
      color: "#FF7847",
    },
  },
  label: {
    color: "#9CA3AF",
    marginBottom: "15px",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
  },
};

export default DisableTwoFactor;
