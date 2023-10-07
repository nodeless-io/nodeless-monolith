import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { formatUuid, formatDate, formatter } from "../../../../../../utils/Utils";
import PaywallRequestStatusBadge from "../PaywallRequestStatusBadge";
import { SinglePaywallContext } from "../../../../../../contexts/paywall/SinglePaywallContext";

const PaywallRequestTableItem = ({ request }) => {
  const { setCurrentRequest, setViewRequestModal } = React.useContext(
    SinglePaywallContext
  );

  const renderType = (type) => {
    switch (type) {
      case "lightning":
        return "Lightning";
      case "onchain":
        return "On Chain";
      default:
        return "";
    }
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      onClick={() => {
        setCurrentRequest(request);
        setViewRequestModal(true);
      }}
      sx={{ cursor: "pointer" }}
    >
      <TableCell sx={styles.tableContentText}>
        {formatUuid(request.uuid)}
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatter(request.amount)}{" "}
        <span style={styles.tableContentTextLabel}>SATS</span>
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {renderType(request.type)}
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        <PaywallRequestStatusBadge status={request.status} />
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatDate(request.created_at, "MMM D,")}
        <span style={styles.tableContentTextLabel}>
          {formatDate(request.created_at, "hh:mm A")}
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

export default PaywallRequestTableItem;
