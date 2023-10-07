import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { formatUuid, formatDate, formatter } from "../../../../../utils/Utils";
import StoreInvoiceStatusBadge from "../StoreInvoiceStatusBadge";
import { StoreContext } from "../../../../../contexts/store/StoreContext";
import { StoreInvoiceContext } from "../../../../../contexts/store/StoreInvoiceContext";

const StoreInvoiceTableItem = ({ invoice }) => {
  const { setViewInvoiceModalOpen } = React.useContext(StoreContext);
  const { setCurrentInvoice } = React.useContext(StoreInvoiceContext);

  return (
    <TableRow
      hover
      tabIndex={-1}
      onClick={() => {
        setCurrentInvoice(invoice);
        setViewInvoiceModalOpen(true);
      }}
    >
      <TableCell sx={styles.tableContentText}>
        {formatUuid(invoice.uuid)}
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {invoice.buyer_email || "Anonymous"}
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatter(invoice.amount)}{" "}
        <span style={styles.tableContentTextLabel}>SATS</span>
      </TableCell>
      <TableCell sx={styles.tableContentText}>
        {formatDate(invoice.created_at, "MMM D,")}
        <span style={styles.tableContentTextLabel}>
          {formatDate(invoice.created_at, "hh:mm A")}
        </span>
      </TableCell>

      <TableCell sx={styles.tableContentText}>
        <StoreInvoiceStatusBadge status={invoice.status} />
      </TableCell>
    </TableRow>
  );
};

const styles = {
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineheight: "20px",
    color: "#6B7280",
  },
  tableContentTextLabel: {
    marginLeft: "5px",
    color: "#a8aeb8",
  },
};

export default StoreInvoiceTableItem;
