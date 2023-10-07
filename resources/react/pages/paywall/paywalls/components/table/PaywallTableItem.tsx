import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { formatUuid, formatDate, formatter } from "../../../../../utils/Utils";
import { APP_ROUTES } from "../../../../app.routes";
import { useNavigate } from "react-router-dom";

const PaywallTableItem = ({ paywall }) => {
  const navigate = useNavigate();

  const displayType = (type: string) => {
    switch (type) {
      case "wp_article":
        return "WordPress article";
      case "download":
        return "Download";
      case "content":
        return "Content";
      case "redirect":
        return "Redirect";
      default:
        return "";
    }
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      onClick={() => navigate(`/app/paywall/${paywall.uuid}/dashboard`)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell sx={styles.tableContentText}>
        {formatUuid(paywall.uuid)}
      </TableCell>
      <TableCell sx={styles.tableContentText}>{paywall.name}</TableCell>
      <TableCell sx={styles.tableContentText}>
        {displayType(paywall.type)}
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatter(paywall.price)}{" "}
        <span style={styles.tableContentTextLabel}>SATS</span>
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatDate(paywall.created_at, "MMM D,")}
        <span style={styles.tableContentTextLabel}>
          {formatDate(paywall.created_at, "hh:mm A")}
        </span>
      </TableCell>
    </TableRow>
  );
};

const styles = {
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "20px",
    color: "#6B7280",
  },
  tableContentTextLabel: {
    marginLeft: "5px",
    color: "#a8aeb8",
  },
};

export default PaywallTableItem;
