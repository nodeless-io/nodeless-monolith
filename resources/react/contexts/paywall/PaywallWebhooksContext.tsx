import React, { useState, useEffect, useMemo, createContext } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

export const PaywallWebhooksContext = createContext<{
  paywallWebhooks: any;
  fetchPaywallWebhooks: () => void;
  isLoading: boolean;
}>({
  paywallWebhooks: [],
  fetchPaywallWebhooks: () => {},
  isLoading: false,
});

export const PaywallWebhooksContextProvider = (props) => {
  const [paywallWebhooks, setPaywallWebhooks] = useState([]);
  const { paywallId } = useParams();

  const fetchPaywallWebhooks = async () => {
    return await useFetch(
      `/bitcoinable_webhook/type/paywall/uuid/${paywallId}`
    );
  };

  const { isLoading, data } = useQuery(
    `paywall-webhooks-${paywallId}`,
    fetchPaywallWebhooks
  );

  useEffect(() => {
    if (data) {
      setPaywallWebhooks(data);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      isLoading,
      paywallWebhooks,
      fetchPaywallWebhooks,
    }),
    [isLoading, paywallWebhooks]
  );

  return (
    <PaywallWebhooksContext.Provider value={value}>
      {props.children}
    </PaywallWebhooksContext.Provider>
  );
};
