import React from "react";

export interface IMainLayout {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IAuthLayout {
  children: React.ReactNode;
  isSignupButtonShown?: boolean;
}
