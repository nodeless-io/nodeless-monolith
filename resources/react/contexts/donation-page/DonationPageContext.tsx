import React, { useState, createContext, useMemo, useEffect } from "react";
import { IDonationPage } from "../../types/donations.interface";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const DonationPageContext = createContext<{
  createDonationPageModalOpen: boolean;
  setCreateDonationPageModalOpen: (data) => void;
  donationPage: IDonationPage;
  setDonationPage: (data) => void;
  isLoading: boolean;
  isError: boolean;
  createDonationPageWebhooksModalOpen: boolean;
  setCreateDonationPageWebhooksModalOpen: (data) => void;
  updateDonationPageWebhooksModalOpen: boolean;
  setUpdateDonationPageWebhooksModalOpen: (data) => void;
  viewDonationModalOpen: boolean;
  setViewDonationModalOpen: (data) => void;
  currentDonation: any;
  setCurrentDonation: (data) => void;
}>({
  createDonationPageModalOpen: false,
  setCreateDonationPageModalOpen: () => {},
  donationPage: {} as IDonationPage,
  setDonationPage: () => {},
  isLoading: false,
  isError: false,
  createDonationPageWebhooksModalOpen: false,
  setCreateDonationPageWebhooksModalOpen: () => {},
  updateDonationPageWebhooksModalOpen: false,
  setUpdateDonationPageWebhooksModalOpen: () => {},
  viewDonationModalOpen: false,
  setViewDonationModalOpen: () => {},
  currentDonation: {} as IDonationPage,
  setCurrentDonation: () => {},
});

const DonationPageContextProvider = (props) => {
  const [
    createDonationPageModalOpen,
    setCreateDonationPageModalOpen,
  ] = useState(false);
  const [
    createDonationPageWebhooksModalOpen,
    setCreateDonationPageWebhooksModalOpen,
  ] = useState(false);

  const [viewDonationModalOpen, setViewDonationModalOpen] = useState(false);

  const [
    updateDonationPageWebhooksModalOpen,
    setUpdateDonationPageWebhooksModalOpen,
  ] = useState(false);

  const [currentDonation, setCurrentDonation] = useState({});

  const { donationPageId, slug } = useParams();

  const fetchDonationPage = async () => {
    return await useFetch("/donation_page/" + slug);
  };

  const { isLoading, isError, data } = useQuery(
    `donation-page-${donationPageId}`,
    fetchDonationPage,
    {
      enabled: !!slug,
    }
  );
  const [donationPage, setDonationPage] = useState<any>({});

  useEffect(() => {
    setDonationPage(data);
  }, [slug, data, donationPageId]);

  const value = useMemo(
    () => ({
      createDonationPageModalOpen,
      setCreateDonationPageModalOpen,
      isLoading,
      isError,
      donationPage,
      setDonationPage,
      createDonationPageWebhooksModalOpen,
      setCreateDonationPageWebhooksModalOpen,
      updateDonationPageWebhooksModalOpen,
      setUpdateDonationPageWebhooksModalOpen,
      viewDonationModalOpen,
      setViewDonationModalOpen,
      currentDonation,
      setCurrentDonation,
    }),
    [
      createDonationPageModalOpen,
      isLoading,
      isError,
      donationPage,
      createDonationPageWebhooksModalOpen,
      updateDonationPageWebhooksModalOpen,
      viewDonationModalOpen,
      currentDonation,
    ]
  );

  return (
    <DonationPageContext.Provider value={value}>
      {props.children}
    </DonationPageContext.Provider>
  );
};

export { DonationPageContextProvider, DonationPageContext };
