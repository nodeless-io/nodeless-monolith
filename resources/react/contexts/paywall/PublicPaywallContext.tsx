import React, { useState, createContext, useMemo, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { APP_ROUTES } from "../../pages/app.routes";

export const PublicPaywallContext = createContext<{
  publicPaywall: any;
  loading: boolean;
  publicPaywallRequest: any;
  status: any;
  setStatus: (data) => void;
}>({
  publicPaywall: [],
  loading: false,
  publicPaywallRequest: [],
  status: "new",
  setStatus: (data) => {},
});

export const PublicPaywallContextProvider = (props) => {
  const { paywallId } = useParams();
  const [loading, setLoading] = useState(false);
  const [publicPaywall, setPublicPaywall] = useState({});
  const [publicPaywallRequest, setPublicPaywallRequest] = useState({});
  const [status, setStatus] = useState<string | null>("new");

  const { isLoading, data } = useQuery(
    [`public-paywall-${paywallId}`],
    async () => {
      return await useFetch(`/p/${paywallId}`);
    }
  );

  const {
    isLoading: paywallRequestLoading,
    data: paywallRequestData,
  } = useQuery(
    [`public-paywall-request--${paywallId}`],
    async () => {
      return await useFetch(`/p/${paywallId}`, {}, "POST");
    },
    {
      enabled: !!data?.data,
      refetchOnWindowFocus: false,
    }
  );

  const { data: pollingData } = useQuery(
    "invoice-poll",
    async () => {
      return await useFetch(
        "/poll/paywall_request/" + paywallRequestData?.paywall_request?.uuid
      );
    },
    {
      refetchInterval: 2000,
      enabled:
        (status == "new" ||
          paywallRequestData?.paywall_request?.status == "new") &&
        !!paywallRequestData?.paywall_request?.uuid,
    }
  );

  useEffect(() => {
    if (data) {
      if (data?.data) {
        setPublicPaywall(data?.data);
        setPublicPaywallRequest(paywallRequestData);
        setStatus(paywallRequestData?.paywall_request?.status);
      } else {
        message.error("Error fetching paywall");
        setTimeout(() => {
          window.location.href = APP_ROUTES.HOME;
          return;
        }, 1000);
      }
    }
  }, [data, paywallRequestData]);

  useEffect(() => {
    if (pollingData) {
      setStatus(pollingData?.status);
    }
  }, [pollingData, paywallRequestData]);

  useEffect(() => {
    if (isLoading || paywallRequestLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, paywallRequestLoading]);

  const value = useMemo(
    () => ({
      publicPaywall,
      loading,
      publicPaywallRequest,
      status,
      setStatus,
    }),
    [publicPaywall, loading, publicPaywallRequest, status]
  );

  return (
    <PublicPaywallContext.Provider value={value}>
      {props.children}
    </PublicPaywallContext.Provider>
  );
};
