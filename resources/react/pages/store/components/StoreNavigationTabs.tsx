import * as React from "react";
import { Box, Tabs, Divider, Tab } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

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

const StoreNavigationTabs = () => {
  const { pathname } = useLocation();

  const { storeId } = useParams();
  const navigate = useNavigate();
  const STORE_TABS = [
    {
      text: "Dashboard",
      link: `/app/stores/dashboard/${storeId}`,
      label: "dashboard",
    },
    {
      text: "Invoices",
      link: `/app/stores/invoices/${storeId}`,
      label: "invoice",
    },
    {
      text: "Store Settings",
      link: `/app/stores/settings/${storeId}`,
      label: "settings",
    },
    {
      text: "Webhooks",
      link: `/app/stores/webhooks/${storeId}`,
      label: "webhooks",
    },
    // {
    //   text: "Checkout Appearance",
    //   link: `/app/stores/appearance/${storeId}`,
    //   label: "checkout",
    // },
  ];

  const currentTab = STORE_TABS.find((tab) => tab.link === pathname);
  const [value, setValue] = React.useState(
    currentTab.label || STORE_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = STORE_TABS.find((tab) => tab.label === newValue);
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
        {STORE_TABS.map((page, index) => (
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

export default StoreNavigationTabs;
