import React from "react";
import { Chip } from "@mui/material";

const PaywallRequestStatusBadge = ({
  status,
}: {
  status:
    | "new"
    | "pending_confirmation"
    | "paid"
    | "expired"
    | "cancelled"
    | "underpaid"
    | "overpaid"
    | "in_flight";
}) => {
  switch (status) {
    case "new":
      return (
        <Chip label={"New"} color="info" variant="outlined" sx={styles.new} />
      );
    case "pending_confirmation":
      return <Chip label={"Pending"} sx={styles.pending} />;
    case "paid":
      return <Chip label={"Paid"} sx={styles.paid} />;
    case "expired":
      return <Chip label={"Expired"} sx={styles.inActive} />;
    case "cancelled":
    case "underpaid":
    case "overpaid":
    case "in_flight":

    default:
      return <Chip label={status} />;
  }
};

const styles = {
  new: {
    height: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  paid: {
    color: "#057A55",
    height: "20px",
    background: "#F3FAF7",
    fontSize: "12px",
    fontWeight: "600",
  },
  inActive: {
    color: "#D92D20",
    height: "20px",
    background: "#FEE4E2",
    fontSize: "12px",
    fontWeight: "600",
  },
  pending: {
    color: "#D03801",
    height: "20px",
    background: "#FEECDC",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default PaywallRequestStatusBadge;
