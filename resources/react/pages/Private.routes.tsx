import React from "react";
import { APP_ROUTES } from "./app.routes";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }: { children: React.ReactNode }): any => {
  return useAuth() ? children : <Navigate to={APP_ROUTES.LOGIN} replace />;
};

export default PrivateRoutes;
