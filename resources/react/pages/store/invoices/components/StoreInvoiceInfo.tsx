import React from "react";
import { Box, Typography } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const Status = ({
  type,
  value,
}: {
  type: "increase" | "decrease";
  value: string;
}) => {
  return (
    <span style={type === "decrease" ? styles.decrease : styles.increase}>
      {type === "decrease" ? "-" : "+"} {value}%
      {type === "decrease" ? (
        <SouthIcon sx={styles.statusIcon} />
      ) : (
        <NorthIcon sx={styles.statusIcon} fontSize="small" />
      )}
    </span>
  );
};

function StoreInvoiceInfo() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.card}>
        <Typography sx={styles.label}>Invoices</Typography>
        <Typography sx={styles.value}>12</Typography>
        <Typography sx={styles.description}>
          <Status type="increase" value="2.5" /> from last month
        </Typography>
      </Box>

      <Box sx={styles.card}>
        <Typography sx={styles.label}>Paid</Typography>
        <Typography sx={styles.value}>.174 BTC</Typography>
        <Typography sx={styles.description}>
          <Status type="decrease" value="0.12" /> from last month
        </Typography>
      </Box>

      <Box sx={styles.card}>
        <Typography sx={styles.label}>Outstanding</Typography>
        <Typography sx={styles.value}>.325 BTC</Typography>
        <Typography sx={styles.description}>
          <Status type="decrease" value="-5.5" /> from last month
        </Typography>
      </Box>

      <Box sx={styles.card}>
        <Typography sx={styles.label}>Expired</Typography>
        <Typography sx={styles.value}>.01 BTC</Typography>
        <Typography sx={styles.description}>
          <Status type="increase" value="2.5" /> from last month
        </Typography>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    marginTop: "45px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    padding: "20px 25px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    marginRight: "10px",
  },
  label: {
    color: "#6B7280",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  value: {
    color: "#1F2A37",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  description: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  increase: {
    color: "#0E9F6E",
  },
  decrease: {
    color: "#F05252",
  },
  statusIcon: {
    height: "12px",
  },
};

export default StoreInvoiceInfo;
