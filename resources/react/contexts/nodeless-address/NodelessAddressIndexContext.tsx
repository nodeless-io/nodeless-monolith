import React, { createContext, useMemo, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

const NodelessAddressIndexContext = createContext<{
  nodelessAddress: any[];
  setNodelessAddress: (value: any) => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
}>({
  nodelessAddress: [],
  setNodelessAddress: (value: any) => {},
  isLoading: false,
  isError: false,
  error: {},
});

const NodelessAddressIndexContextProvider = (props) => {
  const [nodelessAddress, setNodelessAddress] = useState([]);

  const fetchNodelessAddresses = async () => {
    return await useFetch("/inbox");
  };

  const { isLoading, isError, data, error } = useQuery(
    "nodeless-address",
    fetchNodelessAddresses
  );

  useEffect(() => {
    setNodelessAddress(data);
  }, [data]);

  const value = useMemo(
    () => ({
      isLoading,
      isError,
      error,
      nodelessAddress,
      setNodelessAddress,
    }),
    [isLoading, isError, error, nodelessAddress]
  );

  return (
    <NodelessAddressIndexContext.Provider value={value}>
      {props.children}
    </NodelessAddressIndexContext.Provider>
  );
};

export { NodelessAddressIndexContextProvider, NodelessAddressIndexContext };
