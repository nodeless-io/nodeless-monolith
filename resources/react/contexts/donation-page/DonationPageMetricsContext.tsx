import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const DonationPageMetricsContext = createContext<{
  metricsData: any;
  setMetricsData: (value: any) => void;
  isLoading: boolean;
  isError: boolean;
}>({
  metricsData: {},
  setMetricsData: (value: any) => {},
  isLoading: false,
  isError: false,
});

export const DonationPageMetricsContextProvider = (props) => {
  const [metricsData, setMetricsData] = useState({});

  const { donationPageId, slug } = useParams();

  const { isLoading, isError, data } = useQuery(
    `donation-page-metrics-${donationPageId}`,
    async () => {
      return await useFetch(`/donation_page/${donationPageId}/metrics`);
    },
    {
      enabled: !!donationPageId,
    }
  );

  useEffect(() => {
    setMetricsData(data?.data);
  }, [donationPageId, data, slug]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      metricsData,
      setMetricsData,
    }),
    [isLoading, isError, metricsData]
  );

  return (
    <DonationPageMetricsContext.Provider value={value}>
      {props.children}
    </DonationPageMetricsContext.Provider>
  );
};
