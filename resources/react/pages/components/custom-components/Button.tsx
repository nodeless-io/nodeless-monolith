import React from "react";
import {
  SecondaryButtonInterface,
  ErrorButtonInterface,
} from "../../../types/custom-components.interface";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";

export const LinkButton = ({
  styles,
  text,
  link,
}: {
  styles: any;
  text: string;
  link: string;
}) => {
  return (
    <Box sx={{ margin: "40px 0" }}>
      <a
        className="sec-btn"
        style={{ padding: "15px 25px", ...styles }}
        href={link}
      >
        {text}
      </a>
    </Box>
  );
};
export const SecondaryContainedButton = ({
  text,
  onClick,
  styles,
  loading,
  type,
  startIcon,
  disabled,
}: SecondaryButtonInterface) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: "40%", left: 10, color: "white" }}>
        {startIcon}
      </Box>

      <button
        className="sec-btn"
        type={type}
        style={{ ...styles, paddingLeft: startIcon ? "30px" : "unset" }}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <CircularProgress color="primary" size={25} /> : text}
      </button>
    </Box>
  );
};

export const SecondaryOutlinedButton = ({
  text,
  onClick,
  styles,
  loading,
  type,
  startIcon,
}: SecondaryButtonInterface) => {
  return (
    <LoadingButton
      loading={loading}
      variant="outlined"
      sx={{ ...classes.secondaryOutlinedButton, ...styles }}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
    >
      {loading ? null : text}
    </LoadingButton>
  );
};

export const ErrorButton = ({
  text,
  onClick,
  styles,
  startIcon,
  loading,
  disabled,
}: ErrorButtonInterface) => {
  return (
    <LoadingButton
      variant="contained"
      sx={{ ...classes.errorButton, ...styles }}
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled}
      loading={loading}
    >
      {loading ? null : text}
    </LoadingButton>
  );
};

const classes = {
  secondaryOutlinedButton: {
    height: "45px",
    width: "100%",
    borderRadius: "8px",
    background: "white",
    color: "#FF5A1F",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "none",
    border: "1px solid #FF5A1F",
    "&:hover": {
      background: "#FFF6F1",
      color: "#FF5A1F",
      border: "1px solid #FF956B",
    },
    "&:disabled": {
      background: "#FFF6F1",
      border: "1px solid #FF5A1F",
    },
  },
  errorButton: {
    height: "45px",
    width: "100%",
    borderRadius: "8px",
    background: "#D92D20",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "none",
    border: "1px solid #D92D20",
    "&:hover": {
      background: "#FEE4E2",
      border: "1px solid #D92D20",
      color: "#D92D20",
    },
    "&:disabled": {
      background: "#FEE4E2",
      border: "1px solid #D92D20",
      color: "#D92D20",
    },
  },
};
