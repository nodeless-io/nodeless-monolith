import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { formatDate, formatter, formatUuid } from "../../../../../../utils/Utils";
import PaywallRequestStatusBadge from "../PaywallRequestStatusBadge";
import { SinglePaywallContext } from "../../../../../../contexts/paywall/SinglePaywallContext";

const PaywallRequestSmallScreenTableItem = ({ request }) => {
  const { setCurrentRequest, setViewRequestModal } = React.useContext(
    SinglePaywallContext
  );

  return (
    <Grid
      container
      spacing={0}
      sx={styles.container}
      onClick={() => {
        setCurrentRequest(request);
        setViewRequestModal(true);
      }}
    >
      <Grid item xs={9} sx={styles.infoContainer}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={styles.invoiceLabel}>ID:</Typography>
          <Typography sx={styles.email}>{formatUuid(request.uuid)}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
          >
            <Typography sx={styles.date}>
              {formatDate(request.created_at, "MMM D,")}
            </Typography>
            <Typography sx={styles.time}>
              {formatDate(request.created_at, "hh:mm A")}
            </Typography>
          </Box>

          <PaywallRequestStatusBadge status={request.status} />
        </Box>
      </Grid>

      <Grid item xs={3} sx={styles.amountContainer}>
        <Typography sx={styles.amount}>{formatter(request.amount)}</Typography>
        <Typography sx={styles.currency}>SATS</Typography>
      </Grid>
    </Grid>
  );
};

const styles = {
  date: {
    color: "#1F2A37",
    fontSize: "13px",
    marginRight: "2px",
    fontWeight: "600",
  },
  time: {
    color: "#6B7280",
    fontSize: "13px",
    fontWeight: "600",
  },
  invoiceLabel: {
    fontSize: "13px",
    color: "rgba(0, 0, 0, 0.9)",
    fontWeight: "600",
    marginRight: "5px",
  },
  email: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "700",
  },
  infoContainer: {
    textAlign: "left",
  },
  container: {
    marginBottom: "30px",
    width: "100%",
  },
  amountContainer: {
    display: "flex",
    textAlign: "right",
  },
  amount: {
    marginRight: "10px",
    color: "#6B7280",
    fontWeight: "700",
    fontSize: "14px",
  },
  currency: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default PaywallRequestSmallScreenTableItem;
