import React from "react";
import Layout from "../../components/layouts/Layout";
import { DonationPageIndexContextProvider } from "../../../contexts/donation-page/DonationsPageIndexContext";
import { DonationPageContextProvider } from "../../../contexts/donation-page/DonationPageContext";
import Index from "./components/Index";

const DonationPageIndex = () => {
  return (
    <Layout>
      <DonationPageContextProvider>
        <DonationPageIndexContextProvider>
          <Index />
        </DonationPageIndexContextProvider>
      </DonationPageContextProvider>
    </Layout>
  );
};

export default DonationPageIndex;
