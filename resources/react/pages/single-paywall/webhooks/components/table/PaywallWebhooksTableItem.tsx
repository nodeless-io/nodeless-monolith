import React from "react";
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Stack,
  IconButton,
} from "@mui/material";
import PaywallWebhookStatusBadge from "../PaywallWebhookStatusBadge";
import DeletePaywallWebhookModal from "../modals/DeletePaywallWebhookModal";
import UpdatePaywallWebhookModal from "../modals/UpdatePaywallWebhookModal";
import useScreenSize from "../../../../../hooks/useScreenSize";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const PaywallWebhooksTableItem = ({ webhook }: any) => {
  const {
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  } = useScreenSize();
  const [open, setOpen] = React.useState(false);

  if (isExtraLargeScreen && isLargeScreen && isMediumScreen && isSmallScreen) {
    return (
      <UpdatePaywallWebhookModal
        webhook={webhook}
        open={open}
        setOpen={setOpen}
      >
        <Stack
          direction="row"
          sx={styles.container}
          onClick={() => setOpen(true)}
        >
          <Box>
            <Typography sx={styles.url}>{webhook.url}</Typography>
            <Stack direction="row">
              <Stack direction="row">
                <Typography sx={styles.label}>Events:</Typography>
                <Typography sx={styles.value}>
                  {webhook.events.length}
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ marginLeft: "10px" }}>
                <Typography sx={styles.label}>Deliveries:</Typography>
                <Typography sx={styles.value}> 0</Typography>
              </Stack>
            </Stack>
          </Box>

          <PaywallWebhookStatusBadge status={webhook.status} />
        </Stack>
      </UpdatePaywallWebhookModal>
    );
  }

  return (
    <TableRow tabIndex={-1}>
      <TableCell sx={styles.tableContentText}>{webhook.url}</TableCell>

      <TableCell sx={styles.tableContentText}>
        {webhook.events.length}
      </TableCell>

      <TableCell sx={styles.tableContentText}>0</TableCell>

      <TableCell sx={styles.tableContentText}>
        <PaywallWebhookStatusBadge status={webhook.status} />
      </TableCell>

      <TableCell sx={styles.tableContentText}>
        <UpdatePaywallWebhookModal
          webhook={webhook}
          open={open}
          setOpen={setOpen}
        >
          <IconButton
            sx={styles.completeButton}
            size="small"
            onClick={() => setOpen(true)}
          >
            <DriveFileRenameOutlineIcon fontSize="small" />
          </IconButton>
        </UpdatePaywallWebhookModal>
      </TableCell>

      <TableCell sx={styles.tableContentText}>
        <DeletePaywallWebhookModal uuid={webhook.uuid} />
      </TableCell>
    </TableRow>
  );
};

const styles = {
  completeButton: {
    border: "1px solid #E6E8EA",
    borderRadius: "8px",
    color: "#1F2A37",
    "&:hover": {
      background: "#374151",
      border: "1px solid #374151",
      color: "white",
    },
  },
  tableContentText: {
    letterSpacing: "0.04em",
    fontSize: "13px",
    fontWeight: "600",
    lineheight: "20px",
    color: "#6B7280",
  },
  container: {
    padding: "20px 10px 20px 10px",
    justifyContent: "space-between",
    borderBottom: "1px solid #D1D5DB",
    alignItems: "center",
  },
  url: {
    color: "#1F2A37",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    lineHeight: "16px",
    marginBottom: "10px",
  },
  label: {
    color: "#9CA3AF",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    lineHeight: "16px",
    marginRight: "5px",
  },
  value: {
    color: "#1F2A37",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    lineHeight: "16px",
  },
};

export default PaywallWebhooksTableItem;
