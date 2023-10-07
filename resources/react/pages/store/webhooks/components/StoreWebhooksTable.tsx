import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import StoreEmptyWebhooks from "./StoreEmptyWebhooks";
import { StoreWebhooksContext } from "../../../../contexts/store/StoreWebhooksContext";
import StoreWebhooksLoader from "./StoreWebhooksLoader";
import StoreWebhooksTableItem from "./StoreWebhooksTableItem";

const COLUMNS = ["URL", "Events", "Deliveries", "Status"];

const StoreWebhooksTable = () => {
  const { webhooks, isLoading } = React.useContext(StoreWebhooksContext);

  if (isLoading) {
    return <StoreWebhooksLoader />;
  }

  if (!isLoading && webhooks.length === 0) {
    return <StoreEmptyWebhooks />;
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

          <TableBody>
            {webhooks.map((webhook, index) => (
              <StoreWebhooksTableItem key={index} webhook={webhook} />
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
    marginTop: "50px",
    borderRadius: "10px",
  },

  tableHead: {
    background: "#F9FAFB",
    borderBottom: "1px solid #9FA2AC",
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

export default StoreWebhooksTable;
