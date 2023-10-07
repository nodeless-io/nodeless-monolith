import React from "react";
import { Skeleton } from "@mui/material";

const PaywallWebhooksLoader = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{ borderRadius: "10px" }}
      height={300}
    />
  );
};

export default PaywallWebhooksLoader;
