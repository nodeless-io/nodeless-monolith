import * as React from "react";
import { Box, Divider, Tabs, Tab } from "@mui/material";
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

const PaywallNavigationTabs = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const PAYWALL_TABS = [
    {
      text: "Dashboard",
      link: APP_ROUTES.PAYWALL_DASHBOARD,
      label: "dashboard",
    },
    {
      text: "Paywalls",
      link: APP_ROUTES.PAYWALL_PAYWALLS,
      label: "paywalls",
    },
    {
      text: "Requests",
      link: APP_ROUTES.PAYWALL_REQUESTS,
      label: "requests",
    },
  ];

  const currentTab = PAYWALL_TABS.find((tab) => tab.link === pathname);

  const [value, setValue] = React.useState(
    currentTab?.label || PAYWALL_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = PAYWALL_TABS.find((tab) => tab.label === newValue);
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
        {PAYWALL_TABS.map((page, index) => (
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

export default PaywallNavigationTabs;
