import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFetch } from "../../../../hooks/useFetch";
import { UserContext } from "../../../../contexts/user/UserContext";
import ActiveDashboardIcon from "../../../assets/svg/navigation/active-dashboard.svg";
import DashboardIcon from "../../../assets/svg/navigation/dashboard.svg";
import ActiveWithdrawIcon from "../../../assets/svg/navigation/active-withdraw-icon.svg";
import WithdrawIcon from "../../../assets/svg/navigation/withdraw-icon.svg";
import ActiveDonationIcon from "../../../assets/svg/navigation/active-donation-page.svg";
import DonationIcon from "../../../assets/svg/navigation/donation-page.svg";
import ActivePaywallIcon from "../../../assets/svg/navigation/active-paywall.svg";
import PaywallIcon from "../../../assets/svg/navigation/paywall.svg";
import ActiveNodelessAddressIcon from "../../../assets/svg/navigation/active-nodeless-address.svg";
import NodelessAddressIcon from "../../../assets/svg/navigation/nodeless-address.svg";
import ActiveStoreIcon from "../../../assets/svg/navigation/active-store.svg";
import StoreIcon from "../../../assets/svg/navigation/store.svg";
import ActiveSettingsIcon from "../../../assets/svg/navigation/active-settings.svg";
import SettingsIcon from "../../../assets/svg/navigation/settings.svg";
import { formatter } from "../../../../utils/Utils";
import ActiveTransactionsIcon from "../../../assets/svg/navigation/active-transaction.svg";
import TransactionsIcon from "../../../assets/svg/navigation/transaction.svg";
import ApiDocsIcon from "../../../assets/svg/navigation/apidocs.svg";
import SupportIcon from "../../../assets/svg/navigation/support.svg";
import "./styles.css";

const renderIcon = (icon) => <img src={icon} alt="icon" />;

const Navlink = ({ href, text, icon, link = href, activeIcon }) => {
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

const MenuDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const handleLogout = async () => {
    await useFetch("/logout", null, "POST");
    window.location.href = APP_ROUTES.LOGIN;
  };

  return (
    <React.Fragment>
      <IconButton sx={styles.menuButton} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={styles.drawer}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={styles.header}>
            <Box>
              <Box sx={styles.user}>
                <PersonIcon sx={styles.userIcon} fontSize="small" />
                <Box>
                  <Typography sx={styles.userName}>{user?.email}</Typography>

                  <Typography sx={styles.balanceValue}>
                    {formatter(user?.available_balance)} SATS
                  </Typography>
                </Box>
              </Box>
            </Box>

            <IconButton sx={styles.closeButton} onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box sx={styles.linksContainer}>
            <Typography sx={styles.label}>Administration</Typography>

            <Box sx={styles.links}>
              <Navlink
                href={APP_ROUTES.DASHBOARD}
                icon={DashboardIcon}
                activeIcon={ActiveDashboardIcon}
                text="Dashboard"
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
            </Box>

            <Box sx={styles.linkItem}>
              {renderIcon(ApiDocsIcon)}
              <a href={APP_ROUTES.API_DOCS} className="navbar-link">
                API Docs
              </a>
            </Box>

            <Box sx={styles.linkItem}>
              {renderIcon(SupportIcon)}
              <a href={APP_ROUTES.SUPPORT_PORTAL} className="navbar-link">
                Support
              </a>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button
              sx={styles.logout}
              startIcon={<LogoutIcon fontSize="small" />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

const styles = {
  logout: {
    border: "1px solid #D1D5DB",
    borderRadius: "20px",
    color: "#4B5563",
    textTransform: "none",
    padding: "5px 25px",
    fontSize: "14px",
    fontWeight: "600",
    margin: "10px auto",
    width: "150px",
    height: "42px",
  },
  linksContainer: {
    padding: "20px 30px",
  },

  links: {
    marginTop: "15px",
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: "13px",
  },
  header: {
    marginTop: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  balanceValue: {
    color: "#FF5A1F",
    fontSize: "14px",
    fontWeight: "700",
    marginTop: "10px",
  },
  user: {
    display: "flex",
  },
  userIcon: {
    background: "#E5E7EB",
    color: "#130F26",
    borderRadius: "50%",
    padding: "3px",
    height: "25px",
    width: "25px",
    marginRight: "10px",
  },
  userName: {
    fontSize: "15px",
    color: "#6B7280",
    lineHeight: "16px",
    fontWeight: "600",
  },
  menuButton: {
    display: {
      xs: "block",
      sm: "none",
    },
    color: "#374151",
  },
  drawer: {
    width: {
      xs: "300px",
    },
  },
  closeButton: {
    marginTop: "-30px",
  },
  linkItem: {
    display: "flex",
    marginBottom: "15px",
    color: "#6B7280",
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
    color: "#FF5A1F",
    "& svg": {
      color: "#5521B5",
    },
  },
  linkText: {
    fontWeight: "700",
    fontSize: "15px",
    marginLeft: "15px",
    lineHeight: "24px",
  },
};

export default MenuDrawer;
