import React, { useState, useEffect, useMemo, createContext } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { PaginationLength } from "../../pages/components/constants";

export const StoreWebhooksContext = createContext({
  webhooks: [],
  setWebhooks: () => {},
  fetchWebhooks: () => {},
  isLoading: false,
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
});

export const StoreWebhooksContextProvider = (props) => {
  const [webhooks, setWebhooks] = useState([]);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { storeId } = useParams();

  const { isLoading, isError, data, error, refetch } = useQuery(
    "stores-webhooks",
    async () => {
      return await useFetch(`/bitcoinable_webhook/type/store/uuid/${storeId}`);
    },
    {
      enabled: !!storeId,
    }
  );

  useEffect(() => {
    if (data) {
      setWebhooks(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [storeId]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      error,
      data,
      webhooks,
      setWebhooks,
      updateModalOpen,
      setUpdateModalOpen,
    }),
    [isLoading, isError, error, data, webhooks]
  );

  return (
    <StoreWebhooksContext.Provider value={value}>
      {props.children}
    </StoreWebhooksContext.Provider>
  );
};
