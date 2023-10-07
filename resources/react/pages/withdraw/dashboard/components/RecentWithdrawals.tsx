import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  TableCell,
  TablePagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecentWithdrawalsTableItem from "./RecentWithdrawalsTableItem";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import EmptyWithdrawals from "./EmptyWithdrawals";
import { PaginationLength } from "../../../components/constants";
import WithdrawalsLoader from "./WithdrawalsLoader";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
  },
}));

const RecentWithdrawals = () => {
  const {
    withdrawals,
    page,
    setPage,
    isLoading,
    count,
    refetch,
    rowsPerPage,
  } = React.useContext(WithdrawContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <WithdrawalsLoader />;

  if (!withdrawals || withdrawals.length == 0) return <EmptyWithdrawals />;

  return (
    <Box sx={styles.container}>
      <Stack direction="row" sx={styles.header}>
        <Typography sx={styles.headerText}>Recent Withdrawals</Typography>

        <IconButton size="small">
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider sx={{ margin: "15px 0" }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Withdrawal ID</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Mode</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {withdrawals?.map((withdrawal) => (
              <RecentWithdrawalsTableItem
                withdrawal={withdrawal}
                key={withdrawal.uuid}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {count > PaginationLength && (
        <TablePagination
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          nextIconButtonProps={{
            style: {
              color: "black",
            },
          }}
        />
      )}
    </Box>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "10px",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "20px",
    alignItems: "center",
  },
  headerText: {
    color: "#FF5A1F",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    lineHeight: "100%",
  },
};

export default RecentWithdrawals;
