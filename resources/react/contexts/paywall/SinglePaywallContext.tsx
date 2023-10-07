import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PaginationLength } from "../../pages/components/constants";

export const SinglePaywallContext = createContext<{
  metrics: any;
  metricsIsLoading: boolean;
  metricsIsError: any;
  paywall: any;
  isLoading: boolean;
  requests: any[];
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
  requestLoading: boolean;
  currentRequest: any;
  setCurrentRequest: (data) => any;
  viewRequestModal: boolean;
  setViewRequestModal: (data) => any;
}>({
  metrics: {},
  metricsIsLoading: false,
  metricsIsError: {},
  paywall: {},
  isLoading: false,
  requests: [],
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
  requestLoading: false,
  currentRequest: {},
  setCurrentRequest: (data) => {},
  viewRequestModal: false,
  setViewRequestModal: (data) => {},
});

export const SinglePaywallContextProvider = (props) => {
  const { paywallId } = useParams();
  const [metrics, setMetrics] = useState({});
  const [paywall, setPaywall] = useState({});
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState({});
  const [viewRequestModal, setViewRequestModal] = useState(false);

  const [page, setPage] = useState(0);

  const [count, setCount] = useState(PaginationLength);

  const rowsPerPage = PaginationLength;

  const {
    isLoading: metricsIsLoading,
    isError: metricsIsError,
    data: metricsData,
  } = useQuery(`paywall-${paywallId}`, async () => {
    return await useFetch(`/paywall/uuid/${paywallId}/metrics`);
  });

  const { isLoading, data } = useQuery(
    paywallId,
    async () => {
      return await useFetch(`/paywall/uuid/${paywallId}`);
    },
    {
      enabled: !!paywallId,
    }
  );

  const { isLoading: requestLoading, data: requestData, refetch } = useQuery(
    `paywall-${paywallId}-requests`,
    async () => {
      return await useFetch(`/paywall/uuid/${paywallId}/request`);
    },
    {
      enabled: !!paywallId,
    }
  );

  useEffect(() => {
    setPaywall(data);
  }, [paywallId, data]);

  useEffect(() => {
    if (metricsData?.data) {
      setMetrics(metricsData?.data);
    }
  }, [metricsData]);

  useEffect(() => {
    if (requestData?.data) {
      setRequests(requestData?.data);
      setCount(requestData.total);
    }
  }, [requestData]);

  useEffect(() => {
    refetch();
  }, [paywallId, page]);

  const value: any = useMemo(
    () => ({
      metrics,
      metricsIsLoading,
      metricsIsError,
      paywall,
      isLoading,
      requests,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      requestLoading,
      currentRequest,
      setCurrentRequest,
      viewRequestModal,
      setViewRequestModal,
    }),
    [
      metrics,
      metricsIsLoading,
      metricsIsError,
      paywall,
      isLoading,
      requests,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      requestLoading,
      currentRequest,
      viewRequestModal,
    ]
  );

  return (
    <SinglePaywallContext.Provider value={value}>
      {props.children}
    </SinglePaywallContext.Provider>
  );
};
