import React from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StoreIndexContext } from "../../../contexts/store/StoreIndexContext";
import { StoreContext } from "../../../contexts/store/StoreContext";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  shortenString,
  copyToClipboard,
  formatUuid,
} from "../../../utils/Utils";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StoreSelector = () => {
  const { pathname } = useLocation();
  const { storeId } = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { stores } = React.useContext(StoreIndexContext);
  const { setCreateStoreModalOpen } = React.useContext(StoreContext);

  const getStoreName = () => {
    if (stores) {
      const filteredStore = stores.find((store) => store.uuid === storeId);
      return filteredStore?.name;
    }

    return "";
  };

  const generateNewRoute = (uuid: string) =>
    `${pathname.split(storeId)[0]}${uuid}`;

  return (
    <Box
      sx={{
        paddingLeft: "20px",
        display: {
          xs: "block",
          md: "flex",
        },
      }}
    >
      <Button
        sx={styles.storeMenu}
        startIcon={<StoreIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {getStoreName()}
      </Button>

      <Tooltip title={storeId}>
        <Button
          sx={styles.copyButton}
          endIcon={<ContentCopyIcon fontSize="small" />}
          onClick={() =>
            copyToClipboard(storeId, "Store ID copied to clipboard")
          }
          color="secondary"
        >
          {formatUuid(storeId)}
        </Button>
      </Tooltip>

      <Button
        sx={styles.smallStoreMenu}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {shortenString(getStoreName(), 20)}
      </Button>

      <Tooltip title={storeId}>
        <Button
          sx={styles.smallCopyButton}
          endIcon={<ContentCopyIcon fontSize="small" />}
          onClick={() =>
            copyToClipboard(storeId, "Store ID copied to clipboard")
          }
          color="secondary"
        >
          {formatUuid(storeId)}
        </Button>
      </Tooltip>

      {stores?.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          sx={styles.menu}
          open={open}
          onClose={handleClose}
        >
          {stores?.map((store) => (
            <Link key={store.uuid} to={generateNewRoute(store.uuid)}>
              <MenuItem
                sx={
                  store?.uuid == storeId
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
                onClick={handleClose}
              >
                <StoreIcon fontSize="small" color="inherit" />

                <Typography sx={styles.menuItemText}>{store?.name}</Typography>
              </MenuItem>
            </Link>
          ))}

          <SecondaryContainedButton
            text="Add Store"
            startIcon={<AddIcon />}
            styles={styles.addStoreIcon}
            onClick={() => {
              handleClose();
              setCreateStoreModalOpen(true);
            }}
          />
        </Menu>
      )}
    </Box>
  );
};

const styles = {
  addStoreButton: {
    width: "120px",
    height: "36px",
    borderRadius: "24px",
  },

  storeMenu: {
    display: {
      md: "flex",
      xs: "none",
    },
    border: "1px solid #D1D5DB",
    marginTop: "30px",
    borderRadius: "20px",
    color: "#4B5563",
    textTransform: "none",
    padding: "5px 25px",
    fontSize: "14px",
    fontWeight: "600",
  },
  copyButton: {
    display: {
      md: "flex",
      xs: "none",
    },
    marginTop: "30px",
    marginLeft: "10px",
    borderRadius: "20px",
    textTransform: "none",
    padding: "5px 25px",
    fontSize: "14px",
    fontWeight: "600",
  },
  smallCopyButton: {
    display: {
      xs: "flex",
      md: "none",
    },
    marginTop: "10px",
    marginLeft: "10px",
    borderRadius: "20px",
    textTransform: "none",
    padding: "5px 25px",
    fontSize: "14px",
    fontWeight: "600",
  },

  smallStoreMenu: {
    display: {
      xs: "flex",
      md: "none",
    },
    marginTop: "20px",
    borderRadius: "20px",
    color: "#4B5563",
    textTransform: "none",
    padding: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  menu: {
    marginTop: "15px",
  },
  menuItem: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "600",
  },
  activeMenuItem: {
    color: "#FF5A1F",
    fontSize: "14px",
    fontWeight: "600",
  },
  menuItemText: {
    color: "inherit",
    fontSize: "15px",
    fontWeight: "600",
    marginLeft: "15px",
    lineHeight: "100%",
  },
  addStoreIcon: {
    display: {
      md: "none",
    },
    borderRadius: 0,
    marginTop: "10px",
    width: "100%",
  },
};

export default StoreSelector;
