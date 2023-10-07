import React, { useMemo, useEffect } from "react";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLength } from "../../pages/components/constants";
import { filterInvoicesByStatus } from "./helpers";

const StoreInvoiceContext = createContext<{
  invoices: any[];
  setInvoices: (data: any[]) => void;
  isLoading: boolean;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
  currentInvoice: any;
  setCurrentInvoice: (value: any) => void;
  showExpired: boolean;
  setShowExpired: (data) => void;
}>({
  invoices: [],
  setInvoices: (value: any[]) => {},
  isLoading: false,
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
  currentInvoice: {},
  setCurrentInvoice: (value: any) => {},
  showExpired: true,
  setShowExpired: (data) => {},
});

function StoreInvoiceContextProvider(props) {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [page, setPage] = useState(0);
  const [showExpired, setShowExpired] = useState(true);

  const [count, setCount] = useState(PaginationLength);

  const rowsPerPage = PaginationLength;
  const { storeId } = useParams();

  const { data, isLoading, refetch } = useQuery(
    ["invoices" + storeId, page + 1],
    async () => {
      return await useFetch(`/stores/${storeId}/invoices?page=${page + 1}`);
    },
    {
      enabled: !!storeId,
    }
  );

  useEffect(() => {
    if (data) {
      if (showExpired) {
        setInvoices(data?.data);
      } else {
        setInvoices(filterInvoicesByStatus(data?.data));
      }

      setCount(data.total);
    }
  }, [data, showExpired]);

  useEffect(() => {
    refetch();
  }, [storeId, page]);

  const value = useMemo(
    () => ({
      invoices,
      setInvoices,
      isLoading,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
      currentInvoice,
      setCurrentInvoice,
      showExpired,
      setShowExpired,
    }),
    [invoices, isLoading, page, count, currentInvoice, showExpired]
  );

  return (
    <StoreInvoiceContext.Provider value={value}>
      {props.children}
    </StoreInvoiceContext.Provider>
  );
}

export { StoreInvoiceContextProvider, StoreInvoiceContext };
