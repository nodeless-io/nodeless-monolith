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
import EmptyDonationPageWebhooks from "../EmptyDonationPageWebhooks";
import { DonationPageWebhooksContext } from "../../../../../contexts/donation-page/DonationPageWebhooksContext";
import DonationPageWebhooksLoader from "../DonationPageWebhooksLoader";
import DonationPageWebhooksTableItem from "./DonationPageWebhooksTableItem";

const COLUMNS = ["URL", "Events", "Deliveries", "Status"];

const DonationPageWebhooksTable = () => {
  const { donationPageWebhooks, isLoading } = React.useContext(
    DonationPageWebhooksContext
  );

  if (isLoading) {
    return <DonationPageWebhooksLoader />;
  }

  if (!isLoading && donationPageWebhooks.length === 0) {
    return <EmptyDonationPageWebhooks />;
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
            {donationPageWebhooks.map((webhook, index) => (
              <DonationPageWebhooksTableItem key={index} webhook={webhook} />
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

export default DonationPageWebhooksTable;
