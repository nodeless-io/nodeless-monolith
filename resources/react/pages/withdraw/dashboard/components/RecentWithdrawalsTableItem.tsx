import * as React from "react";
import { styled } from "@mui/material/styles";
import { TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { formatUuid, formatDate, formatter } from "../../../../utils/Utils";
import WithdrawStatusBadge from "./WithdrawStatusBadge";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
  },
}));

const RecentWithdrawalsTableItem = ({ withdrawal }) => {
  const { setViewWithdrawalModalOpen, setCurrentWithdrawal } = React.useContext(
    WithdrawContext
  );

  return (
    <StyledTableRow
      onClick={() => {
        setCurrentWithdrawal(withdrawal);
        setViewWithdrawalModalOpen(true);
      }}
    >
      <StyledTableCell sx={styles.tableItem}>
        {formatUuid(withdrawal.uuid)}
      </StyledTableCell>

      <StyledTableCell sx={styles.tableItem}>
        {withdrawal.type === "lightning"
          ? withdrawal.lightning_address
          : withdrawal.onchain_address}
      </StyledTableCell>

      <StyledTableCell sx={styles.tableItem}>
        {withdrawal.type === "lightning" ? "Lightning" : "Onchain"}
      </StyledTableCell>

      <StyledTableCell sx={styles.tableItem}>
        {formatter(withdrawal.amount)}{" "}
        <span style={styles.tableContentTextLabel}>SATS</span>
      </StyledTableCell>

      <StyledTableCell sx={styles.tableItem}>
        <WithdrawStatusBadge status={withdrawal.status} />
      </StyledTableCell>

      <StyledTableCell sx={styles.tableItem}>
        {formatDate(withdrawal.created_at, "MMM D,")}
        <span style={styles.tableContentTextLabel}>
          {formatDate(withdrawal.created_at, "hh:mm A")}
        </span>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const styles = {
  tableContentTextLabel: {
    marginLeft: "5px",
    color: "#a8aeb8",
  },
  tableItem: {
    color: "#6B7280",
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
  },
};

export default RecentWithdrawalsTableItem;
