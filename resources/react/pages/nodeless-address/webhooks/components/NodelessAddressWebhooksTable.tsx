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
import StoreEmptyWebhooks from "./NodelessAddressEmptyWebhooks";
import { NodelessAddressWebhooksContext } from "../../../../contexts/nodeless-address/NodelessAddressWebhooksContext";
import StoreWebhooksLoader from "./NodelessAddressWebhooksLoader";
import NodelessAddressWebhooksTableItem from "./NodelessAddressWebhooksTableItem";

const COLUMNS = ["URL", "Events", "Deliveries", "Status"];

const NodelessAddressWebhooksTable = () => {
  const { isLoading, nodelessAddressWebhooks } = React.useContext(
    NodelessAddressWebhooksContext
  );

  if (isLoading) {
    return <StoreWebhooksLoader />;
  }

  if (!isLoading && nodelessAddressWebhooks.length === 0) {
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
            {nodelessAddressWebhooks.map((webhook, index) => (
              <NodelessAddressWebhooksTableItem key={index} webhook={webhook} />
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
    lineHeight: "20px",
    color: "#374151",
  },
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "20px",
    color: "#6B7280",
  },
};

export default NodelessAddressWebhooksTable;
