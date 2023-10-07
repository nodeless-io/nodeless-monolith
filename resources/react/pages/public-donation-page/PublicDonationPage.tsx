import React from "react";
import { PublicDonationPageContextProvider } from "../../contexts/donation-page/PublicDonationPageContext";
import PublicDonationPageContent from "./components/PublicDonationPageContent";

const PublicDonationPage = () => {
  return (
    <PublicDonationPageContextProvider>
      <PublicDonationPageContent />
    </PublicDonationPageContextProvider>
  );
};

export default PublicDonationPage;
