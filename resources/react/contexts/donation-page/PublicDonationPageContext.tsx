import React, { useState, createContext, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { message } from "antd";

const donationInitialState = {
  amount: "",
  name: "",
  comment: "",
};

export const PublicDonationPageContext = createContext<{
  newDonation: any;
  setNewDonation: (data) => void;
  status: any;
  setStatus: (status) => void;
  invoiceDetails: any;
  setDonationModal: (data) => void;
  donationModal: boolean;
  donationPage: any;
  isLoading: boolean;
  isError: boolean;
  donations: any[];
  handleNewDonation: (data) => void;
  donationDetails: {
    amount: string;
    name: string;
    comment: string;
  };
  setDonationDetails: (data) => void;
  clearDonationDetails: () => void;
}>({
  newDonation: {},
  setNewDonation: (data) => {},
  status: "new",
  setStatus: (status) => {},
  invoiceDetails: {},
  setDonationModal: (data) => {},
  donationModal: false,
  donationPage: {},
  isLoading: false,
  isError: false,
  donations: [],
  handleNewDonation: (data) => {},
  donationDetails: donationInitialState,
  setDonationDetails: (data) => {},
  clearDonationDetails: () => {},
});

export const PublicDonationPageContextProvider = (props) => {
  const [donationModal, setDonationModal] = useState(false);
  const [newDonation, setNewDonation] = useState<any>({});
  const [donations, setDonations] = useState([]);
  const [donationPage, setDonationPage] = useState<any>({});
  const { slug, donationPageId } = useParams();
  const [status, setStatus] = useState<string | null>("new");
  const [donationDetails, setDonationDetails] = React.useState(
    donationInitialState
  );

  const clearDonationDetails = () => {
    setDonationDetails(donationInitialState);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNewDonation = (data) => {
    setNewDonation(data);
    setStatus("new");
    setDonationModal(true);
  };

  const { isLoading, isError, data } = useQuery(
    `donation-page-${slug}`,
    async () => {
      return await useFetch(`/donation-page/${slug}`);
    },
    {
      enabled: !!slug,
    }
  );

  const { data: donationsData } = useQuery(
    `donation-page-${slug}-donations`,
    async () => {
      return await useFetch(`/donation-page/${slug}/donations`);
    },
    {
      enabled: !!slug,
    }
  );

  React.useEffect(() => {
    if (donationsData?.data) {
      setDonations(donationsData?.data);
    }
  }, [slug, donationsData]);

  React.useEffect(() => {
    if (isError) {
      message.error("Error fetching data");
      return navigate(-1);
    }

    if (data?.data) {
      setDonationPage(data.data);
    }
  }, [slug, data]);

  const { data: pollingData } = useQuery(
    `donation-invoice-${donationPageId}-poll`,
    async () => {
      return await useFetch("/poll/donation/" + newDonation.donation.uuid);
    },
    {
      refetchInterval: 3000,
      enabled: status == "new" && donationModal,
    }
  );

  useEffect(() => {
    if (pollingData) {
      setStatus(pollingData?.status);

      if (pollingData?.status == "paid") {
        queryClient.invalidateQueries([`donation-page-${slug}-donations`]);
        setTimeout(() => {
          navigate(`/donate/${slug}`);
        }, 3000);
      }
    }
  }, [pollingData]);

  const value: any = useMemo(
    () => ({
      newDonation,
      setNewDonation,
      status,
      setDonationModal,
      donationModal,
      donationPage,
      isLoading,
      isError,
      donations,
      handleNewDonation,
      donationDetails,
      setDonationDetails,
      clearDonationDetails,
    }),
    [
      newDonation,
      status,
      donationModal,
      donationPage,
      isLoading,
      isError,
      donations,
      donationDetails,
    ]
  );

  return (
    <PublicDonationPageContext.Provider value={value}>
      {props.children}
    </PublicDonationPageContext.Provider>
  );
};
