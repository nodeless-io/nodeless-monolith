import * as React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import CustomCheckbox from "../../../components/custom-components/Checkbox";

interface MessagesTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function NodelessAddressMessagesTableHead(props: MessagesTableHeadProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <CustomCheckbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {/* <TableCell sx={styles.tableHead} /> */}
        <TableCell sx={styles.tableHead}>Sender</TableCell>

        <TableCell sx={styles.tableHead}>Subject</TableCell>

        <TableCell sx={styles.tableHead}>Date</TableCell>
      </TableRow>
    </TableHead>
  );
}

const styles = {
  tableHead: {
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default NodelessAddressMessagesTableHead;
