import React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Skeleton,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { formatDate, shortenString } from "../../../../utils/Utils";
import { NodelessAddressMessageContext } from "../../../../contexts/nodeless-address/NodelessAddressMessageContext";
import EmptyMessages from "../../messages/components/NodelessAddressEmptyMessages";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { currentMonth } from "../../../../utils/helpers";
import ViewMessageModal from "../../messages/components/ViewMessageModal";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
  },
}));

const NodelessAddressRecentMessages = () => {
  const navigate = useNavigate();
  const { addressId } = useParams();

  const {
    setNodelessAddressMessageModalOpen,
    messages,
    isLoading,
    setCurrentMessage,
  } = React.useContext(NodelessAddressMessageContext);

  const handleClick = (event: React.MouseEvent<unknown>, message: any) => {
    setCurrentMessage(message);
    setNodelessAddressMessageModalOpen(true);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          marginTop: "30px",
          border: {
            md: "1px solid #E5E7EB",
          },
          borderRadius: {
            md: "10px",
          },
          width: "100%",
          marginBottom: {
            xs: "150px",
          },
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: {
              xs: "200px",
              md: "300px",
            },
            borderRadius: {
              md: "8px",
            },
          }}
        />
      </Box>
    );
  }

  if (!isLoading && messages.length < 1) {
    return <EmptyMessages />;
  }

  return (
    <Box sx={styles.container}>
      <ViewMessageModal />
      <Box sx={styles.header}>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography sx={styles.headerText}>Recent Messages</Typography>

          <Divider orientation="vertical" />

          <Typography sx={styles.month}>{currentMonth}</Typography>
        </Stack>

        <IconButton
          onClick={() =>
            navigate(`/app/nodeless-address/messages/${addressId}`)
          }
        >
          <LaunchIcon
            fontSize="small"
            //@ts-ignore
            color="gray"
          />
        </IconButton>
      </Box>

      <Divider sx={{ margin: "20px 0" }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadText}>ID</TableCell>
              <TableCell sx={styles.tableHeadText}>From</TableCell>
              <TableCell sx={styles.tableHeadText}>Date Sent</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {messages.slice(0, 10).map((message) => {
              return (
                <StyledTableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={message.uuid}
                  onClick={() => {
                    setCurrentMessage(message);
                    setNodelessAddressMessageModalOpen(true);
                  }}
                >
                  <TableCell
                    sx={styles.tableText}
                    onClick={(event) => handleClick(event, message)}
                  >
                    {message.from}
                  </TableCell>

                  <TableCell
                    sx={styles.tableText}
                    onClick={(event) => handleClick(event, message)}
                  >
                    <span>{message.subject}</span>
                    {shortenString(message.body, 50)}
                  </TableCell>

                  <TableCell
                    sx={styles.tableText}
                    onClick={(event) => handleClick(event, message)}
                  >
                    {formatDate(message.created_at, "MMM D")}
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    border: { md: "1px solid #E5E7EB" },
    borderRadius: "10px",
    width: "100%",
    padding: "20px",
    marginBottom: {
      xs: "150px",
      md: "50px",
    },
  },
  tableText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: {
      xs: "12px",
      md: "13px",
    },
    "& span": {
      fontWeight: "900",
      textTransform: "uppercase",
      marginRight: "10px",
      fontSize: {
        xs: "12px",
        md: "14px",
      },
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    color: "#F04200",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    marginRight: "10px",
  },
  month: {
    color: "#9CA3AF",
    fontSize: {
      xs: "13px",
      md: "16px",
    },
    fontWeight: "600",
    marginLeft: "10px",
  },
  tableHeadText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: {
      xs: "13px",
      md: "16px",
    },
    letterSpacing: "0.04em",
    lineHeight: "14px",
  },
};

export default NodelessAddressRecentMessages;
