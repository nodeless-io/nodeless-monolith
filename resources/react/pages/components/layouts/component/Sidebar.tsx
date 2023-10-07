import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../../logo/Logo";
import SmallLogo from "../../logo/SmallLogo";
import { Link, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import MenuDrawer from "./MenuDrawer";
import useScreenSize from "../../../../hooks/useScreenSize";

import ActiveDashboardIcon from "../../../assets/svg/navigation/active-dashboard.svg";
import DashboardIcon from "../../../assets/svg/navigation/dashboard.svg";
import ActiveWithdrawIcon from "../../../assets/svg/navigation/active-withdraw-icon.svg";
import WithdrawIcon from "../../../assets/svg/navigation/withdraw-icon.svg";
import ActiveDonationIcon from "../../../assets/svg/navigation/active-donation-page.svg";
import DonationIcon from "../../../assets/svg/navigation/donation-page.svg";
import SupportIcon from "../../../assets/svg/navigation/support.svg";
import ActivePaywallIcon from "../../../assets/svg/navigation/active-paywall.svg";
import PaywallIcon from "../../../assets/svg/navigation/paywall.svg";
import ApiDocsIcon from "../../../assets/svg/navigation/apidocs.svg";
import ActiveNodelessAddressIcon from "../../../assets/svg/navigation/active-nodeless-address.svg";
import NodelessAddressIcon from "../../../assets/svg/navigation/nodeless-address.svg";
import ActiveStoreIcon from "../../../assets/svg/navigation/active-store.svg";
import StoreIcon from "../../../assets/svg/navigation/store.svg";
import ActiveSettingsIcon from "../../../assets/svg/navigation/active-settings.svg";
import SettingsIcon from "../../../assets/svg/navigation/settings.svg";
import ActiveTransactionsIcon from "../../../assets/svg/navigation/active-transaction.svg";
import TransactionsIcon from "../../../assets/svg/navigation/transaction.svg";
import "./styles.css";

const renderIcon = (icon) => <img src={icon} alt="icon" />;

const Navlink = ({ href, text, icon, activeIcon, link = href }) => {
  const { pathname } = useLocation();
  const path = pathname.split(link);

  const isSimilarPath = path.length > 1 && path[1] != "";

  const isActive = pathname === href || isSimilarPath;

  return (
    <Link to={href}>
      <Box sx={isActive ? styles.activeLinkItem : styles.linkItem}>
        {renderIcon(isActive ? activeIcon : icon)}

        <Typography sx={styles.linkText}>{text}</Typography>
      </Box>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const {
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  } = useScreenSize();

  const renderLogo = () => {
    if (
      !isSmallScreen &&
      isExtraLargeScreen &&
      isLargeScreen &&
      isMediumScreen
    ) {
      return <SmallLogo />;
    }

    return <Logo />;
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box
          sx={{
            marginBottom: {
              sm: "50px",
              md: "unset",
            },
          }}
        >
          {renderLogo()}
        </Box>

        <MenuDrawer />

        <Box sx={styles.linksContainer}>
          <Typography sx={styles.label}>Administration</Typography>

          <Box sx={styles.links}>
            <Navlink
              href={APP_ROUTES.DASHBOARD}
              icon={DashboardIcon}
              activeIcon={ActiveDashboardIcon}
              text="Dashboard"
              link={APP_ROUTES.DASHBOARD}
            />

            <Navlink
              href={APP_ROUTES.WITHDRAW_DASHBOARD}
              icon={WithdrawIcon}
              activeIcon={ActiveWithdrawIcon}
              text="Withdraw"
              link={APP_ROUTES.WITHDRAW}
            />

            <Navlink
              href={APP_ROUTES.TRANSACTIONS}
              icon={TransactionsIcon}
              activeIcon={ActiveTransactionsIcon}
              text="Transactions"
              link={APP_ROUTES.TRANSACTIONS}
            />
          </Box>
        </Box>

        <Box sx={styles.linksContainer}>
          <Typography sx={styles.label}>Payment</Typography>

          <Box sx={styles.links}>
            <Navlink
              href={APP_ROUTES.DONATION_PAGE_INDEX}
              icon={DonationIcon}
              activeIcon={ActiveDonationIcon}
              text="Donation Page"
              link={APP_ROUTES.DONATIONS}
            />

            <Navlink
              href={APP_ROUTES.NODELESS_ADDRESS_INDEX}
              icon={NodelessAddressIcon}
              activeIcon={ActiveNodelessAddressIcon}
              text="Nodeless Address"
              link={APP_ROUTES.NODELESS_ADDRESS}
            />

            <Navlink
              href={APP_ROUTES.STORES_INDEX}
              icon={StoreIcon}
              activeIcon={ActiveStoreIcon}
              text="Store"
              link={APP_ROUTES.STORES}
            />

            <Navlink
              href={APP_ROUTES.PAYWALL_DASHBOARD}
              icon={PaywallIcon}
              activeIcon={ActivePaywallIcon}
              text="Paywall"
              link={APP_ROUTES.PAYWALL}
            />
          </Box>
        </Box>

        <Box sx={styles.linksContainer}>
          <Typography sx={styles.label}>App</Typography>

          <Box sx={styles.links}>
            <Navlink
              href={APP_ROUTES.PROFILE_ACCOUNT}
              icon={SettingsIcon}
              activeIcon={ActiveSettingsIcon}
              text="Profile"
              link={APP_ROUTES.PROFILE}
            />

            <Box sx={styles.linkItem}>
              {renderIcon(ApiDocsIcon)}
              <a
                href={APP_ROUTES.API_DOCS}
                className="nav-link"
                target="_blank"
              >
                API Docs
              </a>
            </Box>

            <Box sx={styles.linkItem}>
              {renderIcon(SupportIcon)}
              <a
                href={APP_ROUTES.SUPPORT_PORTAL}
                target="_blank"
                className="nav-link"
              >
                Support
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: {
      xs: "100%",
      sm: "70px",
      md: "220px",
      lg: "290px",
    },
    height: {
      xs: "unset",
      md: "100%",
    },
    borderRight: "1px solid #E5E7EB",
    background: "#FFFFFF",
  },

  content: {
    padding: {
      xs: "20px 20px 10px 20px",
      sm: "auto",
      md: "30px 20px",
      lg: "30px",
    },
    display: {
      xs: "flex",
      sm: "block",
    },
    alignItems: "center",
    justifyContent: {
      xs: "space-between",
      sm: "center",
      md: "unset",
    },
    textAlign: {
      xs: "space-between",
      sm: "center",
      md: "unset",
    },
    borderBottom: {
      xs: "1px solid #D1D5DB",
      sm: "unset",
    },
  },
  linksContainer: {
    marginTop: {
      md: "40px",
      lg: "50px",
    },
    paddingLeft: "10px",
    display: {
      xs: "none",
      sm: "block",
    },
  },
  linkIcon: {
    fontSize: {
      xs: "25px",
      md: "22px",
      lg: "25px",
    },
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: "15px",
    display: {
      sm: "none",
      md: "block",
    },
  },
  linkItem: {
    display: "flex",
    marginBottom: "15px",
    alignItems: "center",
    color: "#6B7280",
    marginTop: {
      sm: "22px",
      lg: "unset",
      xs: "unset",
    },
    justifyContent: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
    textAlign: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
    "&:hover": {
      color: "#FF5A1F",
      "& svg": {
        color: "#5521B5",
      },
    },
    "& svg": {
      color: "#9CA3AF",
    },
  },
  activeLinkItem: {
    display: "flex",
    marginBottom: "15px",
    alignItems: "center",
    marginTop: {
      sm: "30px",
      lg: "unset",
      xs: "unset",
    },
    color: "#FF5A1F",
    "& svg": {
      color: "#5521B5",
    },
    justifyContent: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
    textAlign: {
      xs: "unset",
      sm: "center",
      md: "unset",
    },
  },
  links: {
    marginTop: "20px",
  },
  linkText: {
    fontWeight: "700",
    fontSize: {
      lg: "15px",
      md: "13px",
    },
    marginLeft: "15px",
    lineHeight: "24px",
    display: {
      sm: "none",
      md: "block",
    },
  },
};

export default Sidebar;
