import React from "react";
import { APP_ROUTES } from "../../app.routes";
import { Link } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { Box } from "@mui/material";

const Logo = ({ link = APP_ROUTES.DASHBOARD }) => {
  return (
    <Box>
      <Link to={link}>
        <img src={logo} className="nodeless-logo" />
      </Link>
    </Box>
  );
};

export default Logo;
