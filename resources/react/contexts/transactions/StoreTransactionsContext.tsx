import React, { useState, createContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

export const StoreTransactionsContext = createContext<{
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
  currentInvoice: any;
  invoiceLoading: boolean;
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
  currentInvoice: {},
  invoiceLoading: false,
});

export const StoreTransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = PaginationLength;
  const [count, setCount] = useState(PaginationLength);

  const { data, isLoading, refetch } = useQuery(
    ["store-invoices-transactions", page],
    async () => {
      return await useFetch(
        `/transaction/store-invoices?isFee=true&page=${page + 1}`
      );
    }
  );

  const { data: invoiceData, isLoading: invoiceLoading } = useQuery(
    [
      `store-transactions-${currentTransaction?.transactable?.store_id}-${currentTransaction?.transactable?.uuid}`,
    ],
    async () => {
      return await useFetch(
        `/invoices/${currentTransaction?.transactable?.uuid}`
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
    if (invoiceData) {
      setCurrentInvoice(invoiceData);
    }
  }, [invoiceData]);

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
      currentInvoice,
      invoiceLoading,
    }),
    [
      transactions,
      page,
      count,
      isLoading,
      currentTransaction,
      viewTransactionModal,
      currentInvoice,
      invoiceLoading,
    ]
  );

  return (
    <StoreTransactionsContext.Provider value={value}>
      {props.children}
    </StoreTransactionsContext.Provider>
  );
};
