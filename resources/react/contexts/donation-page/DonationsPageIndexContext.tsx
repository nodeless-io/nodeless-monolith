import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const DonationPageIndexContext = createContext<{
  donationPage: any[];
  isLoading: boolean;
  isError: boolean;
  currentTab: "paid" | "unpaid";
  setCurrentTab: (data) => void;
  donations: any[];
  setDonations: (donations) => void;
  donationsLoading: boolean;
  unpaidDonations: any[];
  paidDonations: any[];
}>({
  donationPage: [],
  isLoading: false,
  isError: false,
  currentTab: "paid",
  setCurrentTab: (data) => {},
  donations: [],
  setDonations: (donations) => {},
  donationsLoading: false,
  unpaidDonations: [],
  paidDonations: [],
});

function DonationPageIndexContextProvider(props) {
  const [donationPage, setDonationPage] = useState([]);
  const { donationPageId, slug } = useParams();

  const [currentTab, setCurrentTab] = useState<"paid" | "unpaid">("paid");
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [paidDonations, setPaidDonations] = useState([]);
  const [unpaidDonations, setUnpaidDonations] = useState([]);

  const fetchDonationPage = async () => {
    return await useFetch("/donation_page");
  };

  const { isLoading, isError, data } = useQuery(
    "donation_pages",
    fetchDonationPage
  );

  const {
    isLoading: fetchDonationsLoading,
    isError: fetchDonationsError,
    data: fetchDonationsData,
  } = useQuery(
    "donation_page-donations",
    async () => {
      return await useFetch(`/donation_page/${donationPageId}/donations`);
    },
    {
      enabled: !!donationPageId,
    }
  );

  const {
    isLoading: fetchPaidDonationsLoading,
    isError: fetchPaidDonationsError,
    data: fetchPaidDonationsData,
  } = useQuery(
    "donation_page-paid-donations",
    async () => {
      return await useFetch(`/donation_page/${donationPageId}/paid-donations`);
    },
    {
      enabled: !!donationPageId,
    }
  );

  useEffect(() => {
    setDonationPage(data?.data);
  }, [data, donationPageId, slug]);

  useEffect(() => {
    if (currentTab == "paid") {
      setDonations(fetchPaidDonationsData?.data);
      setPaidDonations(fetchPaidDonationsData?.data);
      setDonationsLoading(fetchPaidDonationsLoading);
    } else {
      setDonations(fetchDonationsData?.data);
      setUnpaidDonations(fetchDonationsData?.data);
      setDonationsLoading(fetchDonationsLoading);
    }
  }, [
    currentTab,
    fetchPaidDonationsData,
    fetchDonationsData,
    fetchDonationsError,
    fetchPaidDonationsError,
  ]);

  const value = useMemo(
    () => ({
      isLoading,
      isError,
      donationPage,
      currentTab,
      setCurrentTab,
      donations,
      donationsLoading,
      paidDonations,
      unpaidDonations,
      setDonations,
    }),

    [
      isLoading,
      isError,
      donationPage,
      currentTab,
      donations,
      donationsLoading,
      paidDonations,
      unpaidDonations,
    ]
  );

  return (
    <DonationPageIndexContext.Provider value={value}>
      {props.children}
    </DonationPageIndexContext.Provider>
  );
}

export { DonationPageIndexContext, DonationPageIndexContextProvider };
