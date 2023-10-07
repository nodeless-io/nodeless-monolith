import React from "react";
import { Box, Typography, Paper, Stack, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EnableTwoFactorForm from "./EnableTwoFactorForm";
import { useFetch } from "../../../../hooks/useFetch";
import { useMutation } from "react-query";
import { message } from "antd";
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

const EnableTwoFactor = () => {
  const [tab, setTab] = React.useState(0);
  const { setTwoFactorDetails } = React.useContext(UserContext);

  const { isLoading, mutateAsync } = useMutation(
    async () => {
      const response = await useFetch("/2fa/show");

      return response;
    },
    {
      onSuccess: (data) => {
        setTwoFactorDetails(data);
        setTab(1);
      },
      onError: (error: any) => {
        message.error("Error!");
        window.location.reload();
      },
    }
  );

  const onClick = async () => {
    await mutateAsync();
  };

  return tab == 0 ? (
    <Item elevation={0} onClick={onClick}>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {isLoading ? (
            <Box>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <>
              <Typography sx={styles.header} color="inherit">
                Enable 2FA
              </Typography>
              <Typography sx={styles.label}>
                Set up 2fa with an authenticator app
              </Typography>
            </>
          )}
        </Box>

        <KeyboardArrowRightIcon
          sx={{
            marginLeft: "20px",
          }}
        />
      </Stack>
    </Item>
  ) : (
    <EnableTwoFactorForm />
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

export default EnableTwoFactor;
