import React from "react";
import { Alert, Box, IconButton, Collapse } from "@mui/material";
import { AlertInterface } from "../../../types/custom-components.interface";
import CloseIcon from "@mui/icons-material/Close";

export const CustomAlert = ({
  type,
  message,
  isOpen,
  closeAlert,
}: AlertInterface) => {
  return (
    <Box sx={styles.container}>
      <Collapse in={isOpen}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

const styles = {
  container: {
    position: "absolute",
    top: "30px",
  },
};
