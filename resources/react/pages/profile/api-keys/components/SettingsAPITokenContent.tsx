import React from "react";
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { UserContext } from "../../../../contexts/user/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import { SecondaryOutlinedButton } from "../../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import SettingsAPIKeysTableItem from "./SettingsAPIKeysTableItem";
import EmptyAPITokens from "./EmptyAPITokens";
import ViewAPIToken from "./ViewAPIToken";

const COLUMNS = ["Label", "Permissions"];

const SettingsAPITokenContent = () => {
  const {
    apiTokens,
    setCreateAPITokenModal,
    setToken,
    setViewAPITokenModal,
  } = React.useContext(UserContext);

  const handleClickOpen = () => {
    setCreateAPITokenModal(true);
  };

  React.useEffect(() => {
    setToken("");
    setViewAPITokenModal(false);
  }, []);
  return (
    <Box sx={styles.container}>
      <Stack direction="row" sx={styles.header}>
        <Typography sx={styles.headerText}>API Tokens</Typography>

        <SecondaryOutlinedButton
          text="Generate Keys"
          startIcon={<AddIcon />}
          styles={styles.generateButton}
          onClick={handleClickOpen}
        />
      </Stack>

      <ViewAPIToken />

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "60%",
          },
        }}
      >
        <Typography sx={styles.text}>
          Create a unique access token that enables your application to access
          the{" "}
          <a href="https://nodeless.io/api-docs" target="_blank">
            Nodeless API
          </a>
          . This API key identifies the application and authorizes it to access
          the API. To find out more about this, please read our API
          authentication docs
        </Typography>
      </Box>

      {apiTokens.length == 0 ? (
        <EmptyAPITokens />
      ) : (
        <TableContainer sx={styles.tableContainer}>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow>
                <TableCell style={styles.tableHeadText}>Label</TableCell>

                <TableCell style={styles.tableHeadText}>
                  <IconButton
                    sx={{
                      background: "#FEE4E2",
                      color: "#D92D20",
                      "&:hover": {
                        background: "#FEE4E2",
                        color: "#D92D20",
                      },
                      cursor: "text",
                    }}
                    size="small"
                  >
                    <CloseIcon fontSize="small" sx={{ fontSize: "16px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {apiTokens &&
                apiTokens.map((token, index) => (
                  <SettingsAPIKeysTableItem key={index} token={token} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ marginTop: "20px" }}>
        <Typography sx={styles.text}>
          Looking for a{" "}
          <a href="https://testnet.nodeless.io/" target="_blank">
            testnet
          </a>{" "}
          environment?
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  descLink: {
    color: "#FF7847",
  },
  generateButton: {
    width: {
      xs: "auto",
      md: "200px",
    },
    borderRadius: "25px",
    height: {
      xs: "30px",
      md: "40px",
    },
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    border: {
      xs: "none",
      md: "1px solid #FF7847",
    },
  },
  container: {
    width: "100%",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: {
      xs: "15px",
      md: "30px",
    },
  },

  headerText: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "18px",
    },
    fontWeight: "600",
  },
  text: {
    color: "#4B5563",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    lineHeight: "150%",
    letterSpacing: "0.04em",
    fontWeight: "500",
    "& a": {
      color: "#FF5A1F",
      cursor: "pointer",
      fontWeight: "600",
    },
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
  tableContainer: {
    marginTop: "50px",
    width: {
      xs: "100%",
    },
  },
};

export default SettingsAPITokenContent;
