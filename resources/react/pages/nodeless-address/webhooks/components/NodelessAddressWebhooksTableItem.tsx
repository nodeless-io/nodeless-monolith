import React from "react";
import { TableCell, TableRow } from "@mui/material";
import StoreWebhookStatusBadge from "./NodelessAddressWebhookStatusBadge";
import DeleteStoreWebhookModal from "./modals/DeleteNodelessAddressWebhookModal";
import UpdateStoreWebhookModal from "./modals/UpdateNodelessAddressWebhookModal";

const NodelessAddressWebhooksTableItem = ({ webhook }: any) => (
  <TableRow tabIndex={-1}>
    <TableCell sx={styles.tableContentText}>{webhook.url}</TableCell>
    <TableCell sx={styles.tableContentText}>{webhook.events.length}</TableCell>
    <TableCell sx={styles.tableContentText}>0</TableCell>
    <TableCell sx={styles.tableContentText}>
      <StoreWebhookStatusBadge status={webhook.status} />
    </TableCell>

    <TableCell sx={styles.tableContentText}>
      <UpdateStoreWebhookModal webhook={webhook} />
    </TableCell>

    <TableCell sx={styles.tableContentText}>
      <DeleteStoreWebhookModal uuid={webhook.uuid} />
    </TableCell>
  </TableRow>
);

const styles = {
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineheight: "20px",
    color: "#6B7280",
  },
};

export default NodelessAddressWebhooksTableItem;
