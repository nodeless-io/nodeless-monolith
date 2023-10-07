import React from "react";
import NodelessAddressMessageMetrics from "./NodelessAddressMessageMetrics";
import NodelessAddressEarningsGraph from "./NodelessAddressEarningsGraph";
import { Stack, Skeleton } from "@mui/material";
import { NodelessAddressMetricsContext } from "../../../../contexts/nodeless-address/NodelessAddressMetricsContext";

const NodelessAddressMetrics = () => {
  const { isLoading } = React.useContext(NodelessAddressMetricsContext);

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: {
            xs: "200px",
            md: "300px",
          },
          borderRadius: "8px",
        }}
      />
    );
  }

  return (
    <Stack
      spacing={2}
      direction={"row"}
      sx={{
        width: "100%",
        display: {
          xs: "block",
          md: "flex",
        },
      }}
    >
      <NodelessAddressMessageMetrics />
      <NodelessAddressEarningsGraph />
    </Stack>
  );
};

export default NodelessAddressMetrics;
