import React from "react";
import { TableCell, TableRow } from "@mui/material";
import DeleteAPITokenModal from "./DeleteAPITokenModal";

const SettingsAPIKeysTableItem = ({ token }) => {
  return (
    <TableRow tabIndex={-1}>
      <TableCell sx={styles.tableContentText}>{token?.name}</TableCell>

      <TableCell sx={styles.tableContentText}>
        <DeleteAPITokenModal uuid={token.id} />
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
};

export default SettingsAPIKeysTableItem;
