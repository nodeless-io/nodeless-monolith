import * as React from "react";
import { Radio, FormControlLabel, Typography } from "@mui/material/";

const RadioComponent = ({ value, label }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio size="small" color="secondary" />}
      label={
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: "14px",
            fontWeight: "600",
            marginLeft: "10px",
          }}
        >
          {label}
        </Typography>
      }
    />
  );
};

export default RadioComponent;
