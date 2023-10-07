import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SecondaryContainedButton } from "../../../components/custom-components/Button";
import SearchIcon from "@mui/icons-material/Search";
import { DonationPageContext } from "../../../../contexts/donation-page/DonationPageContext";

const EmptyDonationPages = () => {
  const { setCreateDonationPageModalOpen } = useContext(DonationPageContext);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerInfo}>
          <Box sx={styles.headerIcon}>
            <FilterListIcon fontSize="small" />
          </Box>

          <Typography sx={styles.headerText}>Donation Pages</Typography>
        </Box>

        <SecondaryContainedButton
          text="New Donation Page"
          styles={styles.addDonationPageButton}
          onClick={() => setCreateDonationPageModalOpen(true)}
        />
      </Box>

      <Box sx={styles.content}>
        <Box sx={{ justifyContent: "center" }}>
          <SearchIcon sx={styles.icon} />

          <Typography sx={styles.label}>
            No Donation pages created yet
          </Typography>

          <Typography sx={styles.description}>
            You haven’t created any donation pages yet.
          </Typography>

          <SecondaryContainedButton
            text="New Donation Page"
            styles={styles.createDonationPageButton}
            onClick={() => setCreateDonationPageModalOpen(true)}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: "0 20px",
      md: "20px 40px",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },
  addDonationPageButton: {
    width: "200px",
    height: "36px",
    borderRadius: "10px",
  },
  createDonationPageButton: {
    width: "175px",
    height: "40px",
    borderRadius: "10px",
    marginTop: "40px",
  },
  headerIcon: {
    background: "#E1EFFE",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
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
      xs: "14px",
      sm: "20px",
      md: "25px",
    },
    fontWeight: "600",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginTop: "100px",
  },
  icon: {
    background: "#F3F4F6",
    borderRadius: "50%",
    height: "68px",
    width: "68px",
    padding: "20px",
    color: "#374151",
    marginBottom: "30px",
  },
  label: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "700",
    marginTop: "30x",
    marginBottom: "20px",
  },
  description: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "150%",
    letterSpacing: "0.01em",
    fontWeight: "600",
  },
};

export default EmptyDonationPages;
