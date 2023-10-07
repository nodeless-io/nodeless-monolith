import React, { useState, useEffect, useMemo, createContext } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

export const DonationPageWebhooksContext = createContext<{
  donationPageWebhooks: any;
  setDonationPageWebhooks: (data) => void;
  isLoading: boolean;
}>({
  donationPageWebhooks: {},
  setDonationPageWebhooks: () => {},
  isLoading: false,
});

export const DonationPageWebhooksContextProvider = (props) => {
  const [donationPageWebhooks, setDonationPageWebhooks] = useState([]);
  const { donationPageId, slug } = useParams();

  const fetchDonationPageWebhooks = async () => {
    return await useFetch(
      `/bitcoinable_webhook/type/donation_page/uuid/${donationPageId}`
    );
  };

  const { isLoading, data } = useQuery(
    "donation_page-webhooks",
    fetchDonationPageWebhooks,
    { enabled: !!donationPageId }
  );

  useEffect(() => {
    if (data) {
      setDonationPageWebhooks(data);
    }
  }, [data, slug, donationPageId]);

  const value = useMemo(
    () => ({
      isLoading,
      donationPageWebhooks,
      setDonationPageWebhooks,
    }),
    [isLoading, donationPageWebhooks]
  );

  return (
    <DonationPageWebhooksContext.Provider value={value}>
      {props.children}
    </DonationPageWebhooksContext.Provider>
  );
};
