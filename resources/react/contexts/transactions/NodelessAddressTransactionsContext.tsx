import React, { useState, createContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

export const NodelessAddressTransactionsContext = createContext<{
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
  currentMessage: any;
  messageLoading: boolean;
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
  currentMessage: {},
  messageLoading: false,
});

export const NodelessAddressTransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = PaginationLength;
  const [count, setCount] = useState(PaginationLength);

  const { data, isLoading, refetch } = useQuery(
    ["gated-messages-transactions", page],
    async () => {
      return await useFetch(
        `/transaction/gated-messages?isFee=true&page=${page + 1}`
      );
    }
  );

  const { data: messageData, isLoading: messageLoading } = useQuery(
    [
      `gated-messages-transactions-${currentTransaction?.transactable?.uuid}-${currentTransaction?.transactable?.uuid}`,
    ],
    async () => {
      return await useFetch(
        `/inbox/${currentTransaction?.transactable?.inbox?.uuid}/message/${currentTransaction?.transactable?.uuid}`
      );
    },
    {
      enabled:
        !!currentTransaction?.transactable?.inbox?.uuid &&
        !!currentTransaction?.transactable?.uuid,
    }
  );

  useEffect(() => {
    if (data?.data) {
      setTransactions(data?.data);
      setCount(data?.meta.total);
    }
  }, [data]);

  useEffect(() => {
    if (messageData?.data) {
      setCurrentMessage(messageData?.data);
    }
  }, [messageData]);

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
      currentMessage,
      messageLoading,
    }),
    [
      transactions,
      page,
      count,
      isLoading,
      currentTransaction,
      viewTransactionModal,
      currentMessage,
      messageLoading,
    ]
  );

  return (
    <NodelessAddressTransactionsContext.Provider value={value}>
      {props.children}
    </NodelessAddressTransactionsContext.Provider>
  );
};
