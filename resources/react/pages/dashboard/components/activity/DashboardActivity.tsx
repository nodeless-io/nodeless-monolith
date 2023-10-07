import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { DashboardContext } from "../../../../contexts/dashboard/DashboardContext";
import StoreIcon from "../../../assets/svg/navigation/store.svg";
import DonationIcon from "../../../assets/svg/navigation/donation-page.svg";
import MessageIcon from "../../../assets/svg/navigation/nodeless-address.svg";
import PaywallIcon from "../../../assets/svg/navigation/paywall.svg";
import WithdrawIcon from "../../../assets/svg/navigation/withdraw-icon.svg";
import { APP_ROUTES } from "../../../app.routes";
import { Link } from "react-router-dom";
import { ActivityTypes } from "../../../../utils/constants";
import EmptyDashboardActivity from "./EmptyDashboardActivity";
import DashboardActivityLoader from "./DashboardActivityLoader";

const DashboardActivity = () => {
  const { dashboardData, isLoading } = React.useContext(DashboardContext);

  const renderActivityIcon = (type) => {
    switch (type) {
      case ActivityTypes.Donation:
        return <img src={DonationIcon} />;
      case ActivityTypes.GatedMessage:
        return <img src={MessageIcon} />;
      case ActivityTypes.LightningAddressPayment:
        return <img src={WithdrawIcon} />;
      case ActivityTypes.PaywallRequest:
        return <img src={PaywallIcon} />;
      case ActivityTypes.StoreInvoice:
        return <img src={StoreIcon} />;
      case ActivityTypes.Withdrawal:
        return <img src={WithdrawIcon} />;
      default:
        return null;
    }
  };

  const generateActivityLink = (activity) => {
    switch (activity?.transaction_data?.transactable_type) {
      case ActivityTypes.Donation:
        return `${APP_ROUTES.DONATION_PAGE_INDEX}/${activity?.transaction_data?.transactable?.donation_page?.uuid}/${activity?.transaction_data?.transactable?.donation_page?.slug}`;
      case ActivityTypes.GatedMessage:
      case ActivityTypes.LightningAddressPayment:
        return `${APP_ROUTES.NODELESS_ADDRESS_INDEX}`;
      case ActivityTypes.PaywallRequest:
        return `${APP_ROUTES.PAYWALL_DASHBOARD}`;
      case ActivityTypes.StoreInvoice:
        return `${APP_ROUTES.STORES_INDEX}/${activity?.transaction_data?.transactable?.store?.uuid}`;
      case ActivityTypes.Withdrawal:
        return APP_ROUTES.TRANSACTIONS;
      default:
        return null;
    }
  };

  const getActivityTitle = (activity) => {
    switch (true) {
      case Boolean(activity?.transaction_data?.transactable?.donation_page):
        return activity?.transaction_data?.transactable?.donation_page?.name;
      case activity?.transaction_data?.transactable_type === "Withdrawal":
        return "Withdrawal";
      case activity?.transaction_data?.transactable_type === "Prism":
        return "Prism";
      default:
        return (
          activity?.transaction_data?.transactable?.subject ||
          activity?.transaction_data?.transactable?.donation_page?.name ||
          activity?.transaction_data?.transactable?.store?.name ||
          activity?.transaction_data?.transactable?.paywall?.name ||
          "Received Lightning Address payment"
        );
    }
  };

  if (isLoading) {
    return (
      <Box sx={styles.container}>
        <Typography sx={styles.header}>Activity</Typography>
        <DashboardActivityLoader />
      </Box>
    );
  }

  if (!isLoading && dashboardData?.activity?.length == 0) {
    return <EmptyDashboardActivity />;
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.header}>Activity</Typography>

      <Divider
        sx={{
          width: {
            xs: "100%",
            md: "100%",
          },
          marginBottom: "10px",
        }}
      />

      <List>
        {dashboardData?.activity &&
          dashboardData?.activity.map((activity, index) => (
            <ListItem
              key={index}
              component={Link}
              to={generateActivityLink(activity)}
              sx={{
                marginBottom: "15px",
                borderRadius: "8px",
                "&:hover": {
                  background: "#F3F4F6",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar className="activity-image-icon">
                  {renderActivityIcon(
                    activity?.transaction_data?.transactable_type
                  )}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Typography sx={styles.subject}>
                      {getActivityTitle(activity)}
                    </Typography>
                    <Typography sx={styles.date}>
                      {dayjs(activity?.transaction_data?.created_at).fromNow()}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Typography sx={styles.message}>{activity.text}</Typography>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

const styles = {
  container: {
    padding: {
      xs: "10px",
      md: "20px 40px 40px 40px",
    },
    width: {
      xs: "100%",
      md: "90%",
    },
    marginBottom: {
      xs: "100px",
      md: "10px",
    },
    marginTop: "30px",
  },
  header: {
    color: "#1F2A37",
    fontWeight: "700",
    fontSize: "15px",
    marginBottom: "15px",
    paddingLeft: "20px",
  },
  subject: {
    color: "#1F2A37",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "19px",
  },
  message: {
    color: "#6B7280",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    marginTop: {
      xs: "1px",
      md: "10px",
    },
    width: "70%",
    lineHeight: "19px",
  },
  date: {
    color: "#9CA3AF",
    fontSize: {
      xs: "12px",
      md: "14px",
    },
    fontWeight: "600",
  },
};

export default DashboardActivity;
