import React, { createContext, useMemo, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { PaginationLength } from "../../pages/components/constants";

export const PaywallIndexContext = createContext<{
  paywalls: any[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
  currentPaywall: any;
  setCurrentPaywall: (value: any) => void;
}>({
  paywalls: [],
  isLoading: false,
  isError: false,
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
  currentPaywall: {},
  setCurrentPaywall: (value: any) => {},
});

export const PaywallIndexContextProvider = (props) => {
  const [paywalls, setPaywalls] = useState([]);
  const [currentPaywall, setCurrentPaywall] = useState({});
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(PaginationLength);

  const rowsPerPage = PaginationLength;

  const fetchPaywalls = async () => {
    return await useFetch(`/paywall?page=${page + 1}`);
  };

  const { isLoading, isError, data, refetch } = useQuery(
    ["paywalls", page + 1],
    fetchPaywalls
  );

  useEffect(() => {
    if (data) {
      setCount(data.total);
      setPaywalls(data?.data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const value = useMemo(
    () => ({
      isLoading,
      isError,
      paywalls,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      currentPaywall,
      setCurrentPaywall,
    }),
    [
      isLoading,
      isError,
      paywalls,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      currentPaywall,
    ]
  );

  return (
    <PaywallIndexContext.Provider value={value}>
      {props.children}
    </PaywallIndexContext.Provider>
  );
};
