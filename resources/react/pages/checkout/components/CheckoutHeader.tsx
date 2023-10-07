import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { formatter } from "../../../utils/Utils";
import { convertSatsToBTC } from "../../../utils/helpers";
import { CheckoutContext } from "../../../contexts/CheckoutContext";
import { useParams } from "react-router-dom";

const CheckoutHeader = () => {
  const { checkout } = React.useContext(CheckoutContext);
  const { invoiceId } = useParams();

  return (
    <Box>
      <Typography color="secondary" sx={styles.header}>
        {checkout?.store?.name}
      </Typography>

      <Divider sx={styles.divider} />

      <Box>
        <Typography sx={styles.label}>Invoice ID</Typography>
        <Typography sx={styles.value}>{invoiceId}</Typography>
      </Box>

      <Box sx={styles.amount}>
        <Typography sx={styles.amountLabel}>Amount</Typography>
        <Typography sx={styles.amountValue} color="secondary">
          {formatter(checkout?.store_invoice.amount)} sats
        </Typography>
        <Typography sx={styles.btcValue} color="secondary">
          {convertSatsToBTC(checkout?.store_invoice.amount)} BTC
        </Typography>
      </Box>

      <Divider sx={styles.divider} />
    </Box>
  );
};

const styles = {
  header: {
    fontSize: "20px",
    fontWeight: "600",
  },
  divider: {
    margin: "10px 0",
  },
  label: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  value: {
    color: "#4B5563",
    fontSize: "16px",
    fontWeight: "600",
  },
  amount: {
    marginTop: "15px",
  },
  amountLabel: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  amountValue: {
    fontSize: "22px",
    fontWeight: "600",
  },
  btcValue: {
    fontSize: "16px",
    fontWeight: "400",
    marginTop: "5px",
  },
  tabsDivider: {
    marginTop: "-16px",
  },
  tabContainer: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  activeTab: {
    color: "#111928",
    fontWeight: "600",
    borderBottom: "1px solid #111928",
    textTransform: "none",
    fontSize: "15px",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
  inactiveTab: {
    color: "#4B5563",
    fontSize: "15px",
    textTransform: "none",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
};

export default CheckoutHeader;
