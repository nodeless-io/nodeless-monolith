import * as React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Skeleton,
} from "@mui/material";
import NodelessAddressMessagesTableHead from "./NodelessAddressMessagesTableHead";
import CustomCheckbox from "../../../components/custom-components/Checkbox";
import StarIcon from "@mui/icons-material/Star";
import { formatDate, shortenString } from "../../../../utils/Utils";
import { styled } from "@mui/material/styles";
import { NodelessAddressMessageContext } from "../../../../contexts/nodeless-address/NodelessAddressMessageContext";
import NodelessAddressEmptyMessages from "./NodelessAddressEmptyMessages";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
  },
}));

const NodelessAddressMessagesTable = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const {
    setNodelessAddressMessageModalOpen,
    messages,
    isLoading,
    setCurrentMessage,
  } = React.useContext(NodelessAddressMessageContext);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = messages.map((n) => n.uuid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, message: any) => {
    setCurrentMessage(message);
    setNodelessAddressMessageModalOpen(true);
  };

  const isSelected = (uuid: string) => selected.indexOf(uuid) !== -1;

  const handleCheckboxSelect = (
    event: React.MouseEvent<unknown>,
    uuid: string
  ) => {
    const selectedIndex = selected.indexOf(uuid);
    let newSelected: readonly string[] = [];

    switch (selectedIndex) {
      case -1:
        newSelected = newSelected.concat(selected, uuid);
        break;
      case 0:
        newSelected = newSelected.concat(selected.slice(1));
        break;
      case selected.length - 1:
        newSelected = newSelected.concat(selected.slice(0, -1));
        break;
      default:
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
        break;
    }

    setSelected(newSelected);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          marginTop: "30px",
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "300px", borderRadius: "8px" }}
        />
      </Box>
    );
  }

  if (!isLoading && messages.length < 1) {
    return <NodelessAddressEmptyMessages />;
  }

  return (
    <Box sx={styles.container}>
      <TableContainer>
        <Table>
          <NodelessAddressMessagesTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={messages.length}
          />

          <TableBody>
            {messages.map((message) => {
              const isItemSelected = isSelected(`${message.uuid}`);

              return (
                <StyledTableRow
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={message.uuid}
                  selected={isItemSelected}
                >
                  {/* <TableCell padding="checkbox">
                    <CustomCheckbox
                      checked={isItemSelected}
                      onClick={(event) =>
                        handleCheckboxSelect(event, `${message.uuid}`)
                      }
                    />
                  </TableCell> */}

                  {/* <TableCell sx={styles.tableText}>
                    <StarIcon
                      sx={{
                        marginRight: {
                          md: "10px",
                        },
                        color: "#FACA15",
                      }}
                    />
                  </TableCell> */}

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
    width: "100%",
    marginTop: "30px",
  },
  tableText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: {
      xs: "12px",
      md: "13px",
    },
    padding: {
      xs: "10px",
      md: "20px",
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
};

export default NodelessAddressMessagesTable;
