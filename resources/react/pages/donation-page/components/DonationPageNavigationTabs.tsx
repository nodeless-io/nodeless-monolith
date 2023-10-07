import * as React from "react";
import { Box, Divider, Tabs, Tab } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { DonationPageIndexContext } from "../../../contexts/donation-page/DonationsPageIndexContext";

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

const DonationPageNavigationTabs = () => {
  const { pathname } = useLocation();

  const { donationPageId, slug } = useParams();
  const navigate = useNavigate();

  const DONATION_PAGE_TABS = [
    {
      text: "Dashboard",
      link: `/app/donation-page/dashboard/${donationPageId}/${slug}`,
      label: "dashboard",
    },
    {
      text: "Settings",
      link: `/app/donation-page/settings/${donationPageId}/${slug}`,
      label: "settings",
    },
    {
      text: "Webhooks",
      link: `/app/donation-page/webhooks/${donationPageId}/${slug}`,
      label: "webhooks",
    },
    // {
    //   text: "Appearance",
    //   link: `/app/donation-page/appearance/${donationPageId}/${slug}`,
    //   label: "checkout",
    // },
  ];

  const currentTab = DONATION_PAGE_TABS.find((tab) => tab.link === pathname);

  const [value, setValue] = React.useState(
    currentTab?.label || DONATION_PAGE_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = DONATION_PAGE_TABS.find((tab) => tab.label === newValue);
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
        {DONATION_PAGE_TABS.map((page, index) => (
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

export default DonationPageNavigationTabs;
