import * as React from "react";
import { TableCell, TableRow } from "@mui/material";
import {
  formatUuid,
  formatDate,
  capitalizeWord,
  formatter,
} from "../../../utils/Utils";
import useScreenSize from "../../../hooks/useScreenSize";
import { addSpaceBeforeUpperCase } from "../../../utils/helpers";

const TransactionTableItem = ({
  transaction,
  setCurrentTransaction,
  setViewTransactionModal,
}: {
  transaction: any;
  setCurrentTransaction: (transaction: any) => void;
  setViewTransactionModal: (transaction: any) => void;
}) => {
  const { isExtraLargeScreen, isLargeScreen, isMediumScreen, isSmallScreen } =
    useScreenSize();
  const checkIfIsShown = (view: string) => true;

  return (
    <React.Fragment>
      {isExtraLargeScreen &&
      isLargeScreen &&
      isMediumScreen &&
      isSmallScreen ? (
        <TableRow
          sx={styles.row}
          onClick={() => {
            setCurrentTransaction(transaction);
            setViewTransactionModal(true);
          }}
        >
          {checkIfIsShown("id") && (
            <TableCell sx={styles.cell}>
              {formatUuid(transaction?.uuid)}
            </TableCell>
          )}

          {checkIfIsShown("type") && (
            <TableCell sx={styles.cell}>
              {transaction.is_fee
                ? `${addSpaceBeforeUpperCase(
                    capitalizeWord(transaction?.transactable_type)
                  )} Fee`
                : addSpaceBeforeUpperCase(
                    capitalizeWord(transaction?.transactable_type)
                  )}
            </TableCell>
          )}

          {checkIfIsShown("amount") && (
            <TableCell sx={styles.cell}>
              {transaction.is_fee && "- "}
              {formatter(transaction.amount)}
              <span style={styles.tableContentTextLabel}>SATS</span>
            </TableCell>
          )}

          {checkIfIsShown("date") && (
            <TableCell sx={styles.cell}>
              {formatDate(transaction.created_at, "MMM D,")}
              <span style={styles.tableContentTextLabel}>
                {formatDate(transaction.created_at, "hh:mm A")}
              </span>
            </TableCell>
          )}
        </TableRow>
      ) : (
        <TableRow
          sx={styles.row}
          onClick={() => {
            setCurrentTransaction(transaction);
            setViewTransactionModal(true);
          }}
        >
          <TableCell sx={styles.cell}>
            {formatUuid(transaction?.uuid)}
          </TableCell>
          <TableCell sx={styles.cell}>
            {transaction.is_fee
              ? `${addSpaceBeforeUpperCase(
                  capitalizeWord(transaction?.transactable_type)
                )} Fee`
              : addSpaceBeforeUpperCase(
                  capitalizeWord(transaction?.transactable_type)
                )}
          </TableCell>
          <TableCell sx={styles.cell}>
            {transaction.is_fee && "- "}
            {formatter(transaction.amount)}
            <span style={styles.tableContentTextLabel}>SATS</span>
          </TableCell>

          <TableCell sx={styles.cell}>
            {formatDate(transaction.created_at, "MMM D,")}

            <span style={styles.tableContentTextLabel}>
              {formatDate(transaction.created_at, "hh:mm A")}
            </span>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

const styles = {
  row: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": {
      background: "#F3F4F6",
      cursor: "pointer",
    },
  },

  cell: {
    color: "#6B7280",
    fontSize: {
      xs: "11px",
      md: "14px",
    },
    fontWeight: "600",
    letterSpacing: "0.04em",
    lineHeight: "20px",
  },

  tableContentTextLabel: {
    marginLeft: "5px",
    color: "#a8aeb8",
  },
};

export default TransactionTableItem;
