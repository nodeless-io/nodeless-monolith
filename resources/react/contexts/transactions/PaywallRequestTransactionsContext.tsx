import React, { useState, createContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

export const PaywallRequestTransactionsContext = createContext<{
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
  currentRequest: any;
  paywallLoading: boolean;
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
  currentRequest: {},
  paywallLoading: false,
});

export const PaywallRequestTransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = PaginationLength;
  const [count, setCount] = useState(PaginationLength);

  const { data, isLoading, refetch } = useQuery(
    ["paywall-request-transactions", page],
    async () => {
      return await useFetch(
        `/transaction/paywall-requests?isFee=true&page=${page + 1}`
      );
    }
  );

  const { data: paywallData, isLoading: paywallLoading } = useQuery(
    [`paywall-request-transactions-${currentTransaction?.transactable?.uuid}`],
    async () => {
      return await useFetch(
        `/paywall/request/${currentTransaction?.transactable?.uuid}`
      );
    },
    {
      enabled: !!currentTransaction?.transactable?.uuid,
    }
  );

  useEffect(() => {
    if (data?.data) {
      setTransactions(data?.data);
      setCount(data?.meta.total);
    }
  }, [data]);

  useEffect(() => {
    if (paywallData?.data) {
      setCurrentRequest(paywallData?.data);
    }
  }, [paywallData]);

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
      currentRequest,
      paywallLoading,
    }),
    [
      transactions,
      page,
      count,
      isLoading,
      currentTransaction,
      viewTransactionModal,
      currentRequest,
      paywallLoading,
    ]
  );

  return (
    <PaywallRequestTransactionsContext.Provider value={value}>
      {props.children}
    </PaywallRequestTransactionsContext.Provider>
  );
};
