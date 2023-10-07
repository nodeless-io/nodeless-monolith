import React from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DonationPageIndexContext } from "../../../contexts/donation-page/DonationsPageIndexContext";
import { DonationPageContext } from "../../../contexts/donation-page/DonationPageContext";
import { useParams, useLocation, Link } from "react-router-dom";
import { shortenString } from "../../../utils/Utils";
import { SecondaryContainedButton } from "../../components/custom-components/Button";
import AddIcon from "@mui/icons-material/Add";
import DraftsIcon from "@mui/icons-material/Drafts";

const DonationPageSelector = () => {
  const { pathname } = useLocation();
  const { donationPageId } = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { donationPage } = React.useContext(DonationPageIndexContext);
  const { setCreateDonationPageModalOpen } = React.useContext(
    DonationPageContext
  );

  const getDonationPageName = () => {
    if (donationPage) {
      const filteredDonationPage = donationPage.find(
        (donationPage) => donationPage.uuid === donationPageId
      );

      return filteredDonationPage?.name;
    }

    return "";
  };

  const generateNewRoute = (uuid: string, slug: string) => {
    return `${pathname.split(donationPageId)[0]}${uuid}/${slug}`;
  };

  return (
    <Box sx={{ paddingLeft: "20px" }}>
      <Button
        sx={styles.pageMenu}
        startIcon={<DraftsIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {getDonationPageName()}
      </Button>

      <Button
        sx={styles.smallPageMenu}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleClick}
      >
        {shortenString(getDonationPageName(), 20)}
      </Button>

      {donationPage?.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          sx={styles.menu}
          open={open}
          onClose={handleClose}
        >
          {donationPage?.map((page) => (
            <Link key={page.uuid} to={generateNewRoute(page.uuid, page.slug)}>
              <MenuItem
                sx={
                  page?.uuid == donationPageId
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
                onClick={handleClose}
              >
                <DraftsIcon fontSize="small" color="inherit" />

                <Typography sx={styles.menuItemText}>{page?.name}</Typography>
              </MenuItem>
            </Link>
          ))}

          <SecondaryContainedButton
            text="New Donation Page"
            startIcon={<AddIcon />}
            styles={styles.addDonationPageIcon}
            onClick={() => {
              handleClose();
              setCreateDonationPageModalOpen(true);
            }}
          />
        </Menu>
      )}
    </Box>
  );
};

const styles = {
  pageMenu: {
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

  smallPageMenu: {
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
    minWidth: "250px",
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
  addDonationPageIcon: {
    display: {
      md: "none",
    },
    borderRadius: 0,
    marginTop: "10px",
    height: "50px",
    width: "100%",
  },
};

export default DonationPageSelector;
