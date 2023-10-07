import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import EnableTwoFactor from "./EnableTwoFactor";
import DisableTwoFactor from "./DisableTwoFactor";
import { useFetch } from "../../../../hooks/useFetch";
import { useQuery } from "react-query";

const TwoFactorSettingsContent = () => {
  const [userDetails, setUserDetails] = React.useState({});

  const { data } = useQuery(`user`, async () => {
    return await useFetch("/user");
  });

  React.useEffect(() => {
    if (data) {
      setUserDetails(data?.data);
    }
  }, [data]);

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid item xs={12} md={4} sx={styles.settingsLabel}>
          <Typography sx={styles.headerText}>
            Two-Factor Authentication
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          {userDetails["2fa_enabled"] ? (
            <DisableTwoFactor />
          ) : (
            <EnableTwoFactor />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  gridContainer: {
    position: "relative",
    marginBottom: "40px",
  },
  settingsLabel: {
    display: {
      xs: "none",
      md: "block",
    },
  },

  container: {
    marginTop: {
      xs: "10px",
      sm: "40px",
    },
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "30px",
  },
};

export default TwoFactorSettingsContent;
