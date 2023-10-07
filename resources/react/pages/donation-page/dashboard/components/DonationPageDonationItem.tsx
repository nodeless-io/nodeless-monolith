import * as React from "react";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import {
  Typography,
  Paper,
  Grid,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";
import { formatter } from "../../../../utils/Utils";

dayjs.extend(relativeTime);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "15px",
  boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.08)",
  borderRadius: "10px",
  height: "100%",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.3)",
  },
}));

const DonationPageDonationItem = ({ donation }) => {
  const { setCurrentDonation, setViewDonationModalOpen } = React.useContext(
    DonationPageContext
  );

  const handleClick = () => {
    setCurrentDonation(donation);
    setViewDonationModalOpen(true);
  };

  return (
    <Grid item md={4} xs={12}>
      <Item onClick={handleClick}>
        <Stack direction="row" sx={styles.header}>
          <IconButton size="small" sx={styles.headerIcon}>
            <PersonIcon fontSize="small" />
          </IconButton>

          <Typography sx={styles.headerText}>{donation?.name}</Typography>
        </Stack>

        <Stack direction="row" sx={styles.details}>
          <Typography sx={styles.amount}>
            {formatter(donation?.amount)} SATS
          </Typography>

          <Typography sx={styles.duration}>
            {dayjs(donation?.created_at).fromNow()}
          </Typography>
        </Stack>

        <Divider />

        <Typography sx={styles.description}>{donation?.message}</Typography>
      </Item>
    </Grid>
  );
};

const styles = {
  header: {
    alignItems: "center",
    marginBottom: "10px",
  },
  headerIcon: {
    cursor: "text",
    marginRight: "15px",
    background: "#FFECE3",
    color: "#FF5A1F",
    "&:hover": {
      cursor: "text",
      background: "#FFECE3",
    },
  },
  headerText: {
    color: "#FF5A1F",
    fontSize: "15px",
    lineHeight: "16px",
    fontWeight: "600",
  },
  details: {
    alignItems: "center",
    margin: "20px 5px 10px 5px",
  },
  amount: {
    color: "#1F2A37",
    fontSize: "20px",
    fontWeight: "600",
  },
  duration: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "400",
    marginLeft: "15px",
  },
  description: {
    color: "#6B7280",
    fontWeight: "400",
    fontSize: "14px",
    letterSpacing: "0.01em",
    lineHeight: "150%",
    margin: "15px 5px 20px 5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    lineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
};

export default DonationPageDonationItem;
