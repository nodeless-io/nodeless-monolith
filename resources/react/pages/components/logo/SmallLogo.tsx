import React from "react";
import { APP_ROUTES } from "../../app.routes";
import { Link } from "react-router-dom";
import logo from "../../assets/svg/small-logo.svg";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to={APP_ROUTES.DASHBOARD}>
        <img src={logo} />
      </Link>
    </Box>
  );
};

export default Logo;
