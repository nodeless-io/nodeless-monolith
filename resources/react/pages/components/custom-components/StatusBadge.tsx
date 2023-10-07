import React from "react";
import { Chip } from "@mui/material";
import { capitalizeWord } from "../../../utils/Utils";

const StatusBadge = ({
  status,
  text = status,
}: {
  status:
    | "new"
    | "pending_confirmation"
    | "paid"
    | "expired"
    | "cancelled"
    | "underpaid"
    | "overpaid"
    | "in_flight"
    | "failed"
    | "completed"
    | "pending"
    | "settled";
  text?: string;
}) => {
  switch (status) {
    case "new":
    case "completed":
    case "paid":
    case "settled":
      return (
        <Chip label={capitalizeWord(text)} variant="outlined" sx={styles.new} />
      );

    case "pending_confirmation":
    case "pending":
      return <Chip label={capitalizeWord(text)} sx={styles.pending} />;

    case "expired":
    case "failed":
    case "cancelled":
      return <Chip label={capitalizeWord(text)} sx={styles.inActive} />;

    case "underpaid":
    case "overpaid":
    case "in_flight":

    default:
      return <Chip label={capitalizeWord(status)} />;
  }
};

const styles = {
  new: {
    height: "20px",
    fontSize: "12px",
    color: "#057A55",
    fontWeight: "600",
    background: "#F3FAF7",
    border: "1px solid transparent",
  },
  paid: {
    color: "#057A55",
    height: "20px",
    background: "#F3FAF7",
    fontSize: "12px",
  },
  inActive: {
    color: "#D92D20",
    height: "20px",
    background: "#FEE4E2",
    fontSize: "12px",
  },
  pending: {
    color: "#D03801",
    height: "20px",
    background: "#FEECDC",
    fontSize: "12px",
  },
};

export default StatusBadge;
