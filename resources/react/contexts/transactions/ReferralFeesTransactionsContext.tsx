import React, { useState, createContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

export const ReferralFeesTransactionsContext = createContext<{
  transactions: any[];
  loading: boolean;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
  currentTransaction: any;
  setCurrentTransaction: (transaction: any) => void;
  setViewTransactionModal: (value: boolean) => void;
  viewTransactionModal: boolean;
}>({
  transactions: [],
  loading: false,
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
  currentTransaction: {},
  setCurrentTransaction: (transaction: any) => {},
  setViewTransactionModal: (value: boolean) => {},
  viewTransactionModal: false,
});

export const ReferralFeesTransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = PaginationLength;
  const [count, setCount] = useState(PaginationLength);

  const { data, isLoading, refetch } = useQuery(
    ["paywall-request-transactions", page],
    async () => {
      return await useFetch(
        `/transaction/referral-fees?isFee=true&page=${page + 1}`
      );
    }
  );

  useEffect(() => {
    if (data?.data) {
      setTransactions(data?.data);
      setCount(data?.meta.total);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const value = useMemo(
    () => ({
      transactions,
      loading: isLoading,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      currentTransaction,
      setCurrentTransaction,
      viewTransactionModal,
      setViewTransactionModal,
    }),
    [
      transactions,
      page,
      count,
      isLoading,
      currentTransaction,
      viewTransactionModal,
    ]
  );

  return (
    <ReferralFeesTransactionsContext.Provider value={value}>
      {props.children}
    </ReferralFeesTransactionsContext.Provider>
  );
};
