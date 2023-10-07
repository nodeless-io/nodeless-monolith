import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

const StoreIndexContext = createContext<{
  stores: any[];
  setStores: () => void;
  fetchStores: () => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
  data: any;
}>({
  stores: [],
  setStores: () => {},
  fetchStores: () => {},
  isLoading: false,
  isError: false,
  error: {},
  data: {},
});

function StoreIndexContextProvider(props) {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    return await useFetch("/stores");
  };

  const { isLoading, isError, data, error } = useQuery("stores", fetchStores);

  useEffect(() => {
    setStores(data);
  }, [data]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      error,
      data,
      stores,
      setStores,
      fetchStores,
    }),
    [isLoading, isError, error, data, stores]
  );

  return (
    <StoreIndexContext.Provider value={value}>
      {props.children}
    </StoreIndexContext.Provider>
  );
}

export { StoreIndexContextProvider, StoreIndexContext };
