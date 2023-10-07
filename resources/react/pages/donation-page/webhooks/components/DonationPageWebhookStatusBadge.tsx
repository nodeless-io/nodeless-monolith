import React from "react";
import { Chip } from "@mui/material";
import { capitalizeWord } from "../../../../utils/Utils";

const DonationPageWebhookStatusBadge = ({
  status,
}: {
  status: "active" | "inactive";
}) => {
  switch (status) {
    case "inactive":
      return <Chip label={capitalizeWord(status)} sx={styles.inActive} />;
    case "active":
    default:
      return <Chip label={capitalizeWord(status)} sx={styles.active} />;
  }
};

const styles = {
  active: {
    color: "#057A55",
    height: "30px",
    background: "#F3FAF7",
    fontSize: "12px",
  },
  inActive: {
    color: "#D92D20",
    height: "30px",
    background: "#FEE4E2",
    fontSize: "12px",
  },
};

export default DonationPageWebhookStatusBadge;
