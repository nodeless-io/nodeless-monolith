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

const TransactionsNavigationTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const TRANSACTIONS_TABS = [
    {
      text: "All",
      link: APP_ROUTES.TRANSACTIONS,
      label: "all",
    },
    {
      text: "Withdrawal",
      link: APP_ROUTES.WITHDRAWAL_TRANSACTIONS,
      label: "withdrawal",
    },
    {
      text: "Donations",
      link: APP_ROUTES.DONATION_TRANSACTIONS,
      label: "donations",
    },
    {
      text: "Nodeless Address",
      link: APP_ROUTES.NODELESS_ADDRESS_TRANSACTIONS,
      label: "nodeless-address",
    },
    {
      text: "Store",
      link: APP_ROUTES.STORE_TRANSACTIONS,
      label: "store",
    },
    {
      text: "Paywall Requests",
      link: APP_ROUTES.PAYWALL_REQUEST_TRANSACTIONS,
      label: "paywall-requests",
    },
    {
      text: "Referral Fees",
      link: APP_ROUTES.REFERRAL_FEES_TRANSACTIONS,
      label: "referral-fees",
    },
    {
      text: "Lightning Address Payments",
      link: APP_ROUTES.LIGHTNING_ADDRESS_PAYMENT_TRANSACTIONS,
      label: "lightning-address-payment",
    },
  ];

  const currentTab = TRANSACTIONS_TABS.find((tab) => tab.link == pathname);

  const [value, setValue] = React.useState(
    currentTab?.label || TRANSACTIONS_TABS[0].label
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    const tab = TRANSACTIONS_TABS.find((tab) => tab.label === newValue);
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
        {TRANSACTIONS_TABS.map((page, index) => (
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

export default TransactionsNavigationTabs;
