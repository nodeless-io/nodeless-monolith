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

const NodelessAddressNavigationTabs = () => {
  const { pathname } = useLocation();

  const { addressId } = useParams();
  const navigate = useNavigate();
  const NODELESS_ADDRESS_TABS = [
    {
      text: "Dashboard",
      link: `/app/nodeless-address/dashboard/${addressId}`,
      label: "dashboard",
    },
    {
      text: "Messages",
      link: `/app/nodeless-address/messages/${addressId}`,
      label: "messages",
    },

    {
      text: "Address Settings",
      link: `/app/nodeless-address/settings/${addressId}`,
      label: "settings",
    },
    {
      text: "Webhooks",
      link: `/app/nodeless-address/webhooks/${addressId}`,
      label: "webhooks",
    },
  ];

  const currentTab = NODELESS_ADDRESS_TABS.find((tab) => tab.link == pathname);

  const [value, setValue] = React.useState(
    currentTab?.label || NODELESS_ADDRESS_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = NODELESS_ADDRESS_TABS.find((tab) => tab.label === newValue);
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
        {NODELESS_ADDRESS_TABS.map((page, index) => (
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

export default NodelessAddressNavigationTabs;
