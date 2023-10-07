import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EmptyPaywallWebhooks from "../EmptyPaywallWebhooks";
import { PaywallWebhooksContext } from "../../../../../contexts/paywall/PaywallWebhooksContext";
import PaywallWebhooksLoader from "../PaywallWebhooksLoader";
import PaywallWebhooksTableItem from "./PaywallWebhooksTableItem";

const COLUMNS = ["URL", "Events", "Deliveries", "Status"];

const PaywallWebhooksTable = () => {
  const { paywallWebhooks, isLoading } = React.useContext(
    PaywallWebhooksContext
  );

  if (isLoading) {
    return <PaywallWebhooksLoader />;
  }

  if (!isLoading && paywallWebhooks.length === 0) {
    return <EmptyPaywallWebhooks />;
  }

  return (
    <Box sx={styles.container}>
      <TableContainer>
        <Table>
          <TableHead sx={styles.tableHead}>
            <TableRow>
              {COLUMNS.map((column, index) => (
                <TableCell key={index} style={styles.tableHeadText}>
                  {column}
                </TableCell>
              ))}
              <TableCell style={styles.tableHeadText}></TableCell>
              <TableCell style={styles.tableHeadText}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              borderTop: {
                xs: "1px solid #D1D5DB",
                md: "unset",
              },
            }}
          >
            {paywallWebhooks.map((webhook, index) => (
              <PaywallWebhooksTableItem key={index} webhook={webhook} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    marginTop: {
      xs: "10px",
      md: "50px",
    },
    borderRadius: "10px",
  },

  tableHead: {
    background: "#F9FAFB",
    borderBottom: "1px solid #9FA2AC",
    display: {
      xs: "none",
      md: "table-header-group",
    },
  },
  tableHeadText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineheight: "20px",
    color: "#374151",
  },
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineheight: "20px",
    color: "#6B7280",
  },
};

export default PaywallWebhooksTable;
