import React, { useState, useEffect, createContext, useMemo } from "react";
import { IStore } from "../../types/stores.interface";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

const StoreContext = createContext({
  store: {} as IStore,
  setStore: () => {},
  isLoading: false,
  isError: false,
  error: {},
  data: {} as IStore,
  createInvoiceModalOpen: false,
  setCreateInvoiceModalOpen: (value: boolean) => {},
  viewInvoiceModalOpen: false,
  setViewInvoiceModalOpen: (value: boolean) => {},
  createStoreModalOpen: false,
  setCreateStoreModalOpen: (value: boolean) => {},
  createStoreWebhookModalOpen: false,
  setCreateStoreWebhookModalOpen: (value: boolean) => {},
  loading: false,
  setLoading: () => {},
});

function StoreContextProvider(props) {
  const [createStoreModalOpen, setCreateStoreModalOpen] = useState(false);
  const [createInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);
  const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = useState(false);
  const [
    createStoreWebhookModalOpen,
    setCreateStoreWebhookModalOpen,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeId } = useParams<{ storeId: string }>();

  const fetchStore = async () => {
    return await useFetch("/stores/" + storeId);
  };

  const { isLoading, isError, data, error } = useQuery(
    `store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
    }
  );
  const [store, setStore] = useState(data);

  useEffect(() => {
    setStore(data);
  }, [storeId, data]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      error,
      data,
      store,
      setStore,
      createStoreModalOpen,
      setCreateStoreModalOpen,
      createInvoiceModalOpen,
      setCreateInvoiceModalOpen,
      loading,
      setLoading,
      createStoreWebhookModalOpen,
      setCreateStoreWebhookModalOpen,
      viewInvoiceModalOpen,
      setViewInvoiceModalOpen,
    }),
    [
      isLoading,
      isError,
      error,
      data,
      store,
      createStoreModalOpen,
      createInvoiceModalOpen,
      loading,
      createStoreWebhookModalOpen,
      viewInvoiceModalOpen,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export { StoreContextProvider, StoreContext };
