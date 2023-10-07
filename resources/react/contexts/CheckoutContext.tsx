import React, { createContext, useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const CheckoutContext = createContext<{
  checkout: any;
  error: any;
  isLoading: boolean;
  status: any;
  setStatus: (data) => void;
}>({
  checkout: {},
  error: {},
  isLoading: false,
  status: "new",
  setStatus: (data) => {},
});

function CheckoutContextProvider(props) {
  const [checkout, setCheckout] = useState({});
  const [status, setStatus] = useState<string | null>("new");
  const { invoiceId } = useParams();

  const { data, error, isLoading } = useQuery(
    "checkout_" + invoiceId,
    async () => {
      return await useFetch("/invoice/" + invoiceId);
    }
  );

  const { data: pollingData } = useQuery(
    "invoice-poll",
    async () => {
      return await useFetch("/poll/store_invoice/" + invoiceId);
    },
    {
      refetchInterval: 3000,
      enabled: status == "new" || data?.store_invoice?.status == "new",
    }
  );

  useEffect(() => {
    setCheckout(data);
    setStatus(data?.store_invoice?.status);
  }, [data, checkout]);

  useEffect(() => {
    if (pollingData) {
      setStatus(pollingData?.status);
    }
  }, [pollingData, data]);

  const value = useMemo(
    () => ({ checkout, error, isLoading, status, setStatus }),
    [checkout, data, status]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutContextProvider;
