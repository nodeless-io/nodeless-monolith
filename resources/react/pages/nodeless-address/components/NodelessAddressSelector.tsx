import React from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NodelessAddressIndexContext } from "../../../contexts/nodeless-address/NodelessAddressIndexContext";
import { NodelessAddressContext } from "../../../contexts/nodeless-address/NodelessAddressContext";
import { useParams, useLocation, Link } from "react-router-dom";
import { shortenString } from "../../../utils/Utils";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import DraftsIcon from "@mui/icons-material/Drafts";

const NodelessAddressSelector = () => {
  const { pathname } = useLocation();
  const { addressId } = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { nodelessAddress } = React.useContext(NodelessAddressIndexContext);
  const { setCreateNodelessAddressModal } = React.useContext(
    NodelessAddressContext
  );

  const getNodelessAddressName = () => {
    if (nodelessAddress) {
      const filteredNodelessAddress = nodelessAddress.find(
        (nodelessAddress) => nodelessAddress.uuid === addressId
      );

      return `${filteredNodelessAddress?.username}@nodeless.io`;
    }

    return "";
  };

  const generateNewRoute = (uuid: string) =>
    `${pathname.split(addressId)[0]}${uuid}`;

  return (
    <Box sx={{ paddingLeft: "20px" }}>
      <Button
        sx={styles.addressMenu}
        startIcon={<DraftsIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {getNodelessAddressName()}
      </Button>

      <Button
        sx={styles.smallAddressMenu}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {shortenString(getNodelessAddressName(), 20)}
      </Button>

      {nodelessAddress?.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          sx={styles.menu}
          open={open}
          onClose={handleClose}
        >
          {nodelessAddress?.map((address) => (
            <Link key={address.uuid} to={generateNewRoute(address.uuid)}>
              <MenuItem
                sx={
                  address?.uuid == addressId
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
                onClick={handleClose}
              >
                <DraftsIcon fontSize="small" color="inherit" />

                <Typography sx={styles.menuItemText}>
                  {address?.username}@nodeless.io
                </Typography>
              </MenuItem>
            </Link>
          ))}

          <SecondaryContainedButton
            text="Add Address"
            startIcon={<AddIcon />}
            styles={styles.addAddressIcon}
            onClick={() => {
              handleClose();
              setCreateNodelessAddressModal(true);
            }}
          />
        </Menu>
      )}
    </Box>
  );
};

const styles = {
  addressMenu: {
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

  smallAddressMenu: {
    display: {
      xs: "flex",
      md: "none",
    },
    marginTop: 0,
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
  addAddressIcon: {
    display: {
      md: "none",
    },
    borderRadius: 0,
    marginTop: "10px",
    width: "100%",
  },
};

export default NodelessAddressSelector;
