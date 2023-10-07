import React from "react";
import Layout from "../../components/layouts/Layout";
import { DashboardContextProvider } from "../../../contexts/dashboard/DashboardContext";

import "../styles.css";

function DashboardLayout({ children }) {
  return (
    <Layout>
      <DashboardContextProvider>{children}</DashboardContextProvider>
    </Layout>
  );
}

export default DashboardLayout;
