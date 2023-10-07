import React, { useMemo, useEffect } from "react";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

const PaywallRequestContext = createContext<{
  requests: any[];
  setRequests: (data: any[]) => void;
  isLoading: boolean;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
}>({
  requests: [],
  setRequests: (value: any[]) => {},
  isLoading: false,
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
});

function PaywallRequestContextProvider(props) {
  const [requests, setRequests] = useState([]);

  const [page, setPage] = useState(0);

  const [count, setCount] = useState(PaginationLength);

  const rowsPerPage = PaginationLength;

  const { data, isLoading, refetch } = useQuery(
    ["paywall-requests", page + 1],
    async () => {
      return await useFetch(`/paywall/requests?page=${page + 1}`);
    }
  );

  useEffect(() => {
    if (data) {
      setRequests(data?.data);

      setCount(data.total);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const value = useMemo(
    () => ({
      requests,
      setRequests,
      isLoading,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
    }),
    [requests, isLoading, page, count]
  );

  return (
    <PaywallRequestContext.Provider value={value}>
      {props.children}
    </PaywallRequestContext.Provider>
  );
}

export { PaywallRequestContextProvider, PaywallRequestContext };
