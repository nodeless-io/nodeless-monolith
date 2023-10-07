import React, { useState, createContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";

export const DonationsTransactionsContext = createContext<{
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
  currentDonation: any;
  donationLoading: boolean;
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
  currentDonation: {},
  donationLoading: false,
});

export const DonationsTransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState({});

  const [page, setPage] = useState(0);
  const rowsPerPage = PaginationLength;
  const [count, setCount] = useState(PaginationLength);

  const { data, isLoading, refetch } = useQuery(
    ["donations-transactions", page],
    async () => {
      return await useFetch(
        `/transaction/donations?isFee=true&page=${page + 1}`
      );
    }
  );

  const { data: donationData, isLoading: donationLoading } = useQuery(
    [
      `donations-transactions-${currentTransaction?.transactable?.donation_page_id}-${currentTransaction?.transactable?.uuid}`,
    ],
    async () => {
      return await useFetch(
        `/donation_page/${currentTransaction?.transactable?.donation_page_id}/donations/${currentTransaction?.transactable?.uuid}`
      );
    },
    {
      enabled:
        !!currentTransaction?.transactable?.donation_page_id &&
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
    if (donationData?.data) {
      setCurrentDonation(donationData?.data);
    }
  }, [donationData]);

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
      currentDonation,
      donationLoading,
    }),
    [
      transactions,
      page,
      count,
      isLoading,
      currentTransaction,
      viewTransactionModal,
      currentDonation,
      donationLoading,
    ]
  );

  return (
    <DonationsTransactionsContext.Provider value={value}>
      {props.children}
    </DonationsTransactionsContext.Provider>
  );
};
