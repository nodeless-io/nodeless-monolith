import * as React from "react";
import { Box, Tabs, Divider, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { APP_ROUTES } from "../../app.routes";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#B34116",
  },
});

const AntTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",

    fontSize: "15px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },

    color: "#4B5563",
    "&:hover": {
      color: "#111928",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#111928",
      fontWeight: "700",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const SettingsNavigationTabs = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const SETTINGS_TABS = [
    {
      text: "Account",
      link: APP_ROUTES.PROFILE_ACCOUNT,
      label: "account",
    },
    {
      text: "Two-Factor Authentication",
      link: APP_ROUTES.PROFILE_TWO_FACTOR,
      label: "2fa",
    },
    {
      text: "API Tokens",
      link: APP_ROUTES.PROFILE_API_KEYS,
      label: "api-keys",
    },
    {
        text: "Referrals",
        link: APP_ROUTES.PROFILE_REFERRALS,
        label: "referrals",
      },
    {
      text: "Notifications",
      link: APP_ROUTES.PROFILE_NOTIFICATIONS,
      label: "notifications",
    },
  ];

  const currentTab = SETTINGS_TABS.find((tab) => tab.link === pathname);

  const [value, setValue] = React.useState(
    currentTab.label || SETTINGS_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = SETTINGS_TABS.find((tab) => tab.label === newValue);
    navigate(tab.link);
  };

  return (
    <Box sx={styles.container}>
      <AntTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        textColor="secondary"
        indicatorColor="secondary"
      >
        {SETTINGS_TABS.map((page, index) => (
          <AntTab label={page.text} key={index} value={page.label} />
        ))}
      </AntTabs>

      <Divider />
    </Box>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    width: {
      xs: "100vw",
      md: "100%",
    },
    marginBottom: "20px",
  },
};

export default SettingsNavigationTabs;
