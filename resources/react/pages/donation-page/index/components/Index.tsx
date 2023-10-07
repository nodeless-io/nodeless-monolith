import React from "react";
import { DonationPageIndexContext } from "../../../../contexts/donation-page/DonationsPageIndexContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import DonationPageIndexSkeletons from "./DonationPageIndexSkeletons";
import EmptyDonationPages from "./EmptyDonationPages";
import CreateDonationPageModal from "../../components/modals/CreateDonationPageModal";

const Index = () => {
  const { isLoading, donationPage } = React.useContext(
    DonationPageIndexContext
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && donationPage && donationPage.length > 0) {
      navigate(
        `${APP_ROUTES.DONATION_PAGE_INDEX}/${donationPage[0]?.uuid}/${donationPage[0].slug}`
      );
    }
  }, [isLoading, donationPage]);

  if (isLoading) {
    return <DonationPageIndexSkeletons />;
  }

  if (!isLoading && donationPage && donationPage.length === 0) {
    return (
      <>
        <CreateDonationPageModal />
        <EmptyDonationPages />
      </>
    );
  }
};

export default Index;
