import React from "react";
import { Skeleton, Stack } from "@mui/material";

export function SkeletonContent() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height={100} sx={{ marginBottom: "20px" }} />
      <Skeleton variant="rounded" height={100} />
    </Stack>
  );
}

export function SkeletonTitle() {
  return (
    <Stack spacing={1} sx={{ marginTop: "20px" }}>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="rectangular" width={210} height={30} />
    </Stack>
  );
}
