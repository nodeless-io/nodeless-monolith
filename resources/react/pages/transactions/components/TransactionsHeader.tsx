import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useMutation } from "react-query";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import { formatDate } from "../../../utils/Utils";
import { saveAs } from "file-saver";

function TransactionsHeader() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    start_date: null,
    end_date: null,
  });

  const handleDateChange = (name: string, value: any) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const exportCSV = async (payload) => {
    const response = await useFetch(
      "/transaction/export-csv/date-range",
      payload,
      "POST"
    );

    return response;
  };

  const handleCancel = () => {
    setState({
      start_date: null,
      end_date: null,
    });
    handleClose();
  };

  const { isLoading, mutateAsync } = useMutation(exportCSV, {
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Transactions.csv");
      message.success("Transactions exported successfully!");
      handleClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.status || "Error ");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      start_date: formatDate(state.start_date, "YYYY-MM-DD"),
      end_date: formatDate(state.end_date, "YYYY-MM-DD"),
    };

    await mutateAsync(payload);
  };

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerInfo}>
        <Stack direction="row">
          <Box sx={styles.headerIcon}>
            <ReceiptIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Transactions </Typography>
        </Stack>

        <Button
          color="secondary"
          sx={styles.export}
          startIcon={<FileDownloadIcon />}
          onClick={handleClickOpen}
        >
          Export
        </Button>

        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={styles.modalHeader}>Select date range</DialogTitle>

          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <Stack
                    direction="row"
                    spacing={5}
                    sx={{ overflow: "hidden" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <InputLabel
                        shrink
                        htmlFor="name"
                        //@ts-ignore
                        color="black"
                        sx={styles.textFieldLabel}
                      >
                        Start Date
                      </InputLabel>

                      <DatePicker
                        value={state.start_date}
                        onChange={(newValue) =>
                          handleDateChange("start_date", newValue)
                        }
                        format="YYYY-MM-DD"
                      />
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <InputLabel
                        shrink
                        htmlFor="name"
                        //@ts-ignore
                        color="black"
                        sx={styles.textFieldLabel}
                      >
                        End Date
                      </InputLabel>

                      <DatePicker
                        value={state.end_date}
                        onChange={(newValue) =>
                          handleDateChange("end_date", newValue)
                        }
                        format="YYYY-MM-DD"
                      />
                    </Box>
                  </Stack>
                </DemoContainer>
              </LocalizationProvider>
            </DialogContent>

            <DialogActions sx={{ margin: "20px 0" }}>
              <Button
                onClick={handleCancel}
                sx={styles.export}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>

              <Button
                sx={styles.export}
                color="secondary"
                variant="contained"
                type="submit"
                disabled={!state.end_date || !state.start_date}
              >
                {isLoading ? (
                  <CircularProgress color="primary" size={25} />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}

const styles = {
  export: {
    textTransform: "none",
    borderRadius: "5px",
    "&.Mui-disabled": {
      background: "#FF5A1F",
      color: "white",
      opacity: 0.7,
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: {
      xs: "0px 20px",
    },
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerIcon: {
    background: "#FFECE3",
    borderRadius: "50%",
    height: {
      xs: "27px",
      md: "30px",
    },
    width: {
      xs: "27px",
      md: "30px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FF5A1F",
    padding: "2px",
    marginRight: "15px",
  },
  headerText: {
    color: "#111928",
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "25px",
    },
    fontWeight: "600",
    marginLeft: {
      xs: "-5px",
      md: "unset",
    },
  },
  modalHeader: {
    color: "#111928",
    fontSize: {
      xs: "16px",
      md: "16px",
    },
    fontWeight: "600",
    lineHeight: "100%",
    marginTop: "10px",
  },
  textFieldLabel: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "18px",
    color: "#1F2A37",
  },
};

export default TransactionsHeader;
