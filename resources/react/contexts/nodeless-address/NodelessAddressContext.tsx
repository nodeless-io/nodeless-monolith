import React, { useState, createContext, useMemo, useEffect } from "react";
import { INodelessAddress } from "../../types/nodeless-address.interface";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const NodelessAddressContext = createContext<{
  createNodelessAddressModal: boolean;
  setCreateNodelessAddressModal: (value: boolean) => void;
  nodelessAddress: INodelessAddress;
  setNodelessAddress: (value: any) => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
  createNodelessAddressWebhooksModalOpen: boolean;
  setCreateNodelessAddressWebhooksModalOpen: (value: boolean) => void;
  updateNodelessAddressWebhooksModalOpen: boolean;
  setUpdateNodelessAddressWebhooksModalOpen: (value: boolean) => void;
}>({
  createNodelessAddressModal: false,
  setCreateNodelessAddressModal: (value) => {},
  nodelessAddress: {} as INodelessAddress,
  setNodelessAddress: (value) => {},
  isLoading: false,
  isError: false,
  error: {},
  createNodelessAddressWebhooksModalOpen: false,
  setCreateNodelessAddressWebhooksModalOpen: () => {},
  updateNodelessAddressWebhooksModalOpen: false,
  setUpdateNodelessAddressWebhooksModalOpen: () => {},
});

const NodelessAddressContextProvider = (props) => {
  const [createNodelessAddressModal, setCreateNodelessAddressModal] = useState(
    false
  );
  const [
    createNodelessAddressWebhooksModalOpen,
    setCreateNodelessAddressWebhooksModalOpen,
  ] = useState(false);
  const [
    updateNodelessAddressWebhooksModalOpen,
    setUpdateNodelessAddressWebhooksModalOpen,
  ] = useState(false);

  const { addressId } = useParams<{ addressId: string }>();

  const fetchNodelessAddress = async () => {
    return await useFetch("/inbox/" + addressId);
  };

  const { isLoading, isError, data, error } = useQuery(
    `nodeless-address-${addressId}`,
    fetchNodelessAddress,
    {
      enabled: !!addressId,
    }
  );
  const [nodelessAddress, setNodelessAddress] = useState(data);

  useEffect(() => {
    setNodelessAddress(data);
  }, [addressId, data]);

  const value = useMemo(
    () => ({
      createNodelessAddressModal,
      setCreateNodelessAddressModal,
      nodelessAddress,
      setNodelessAddress,
      isLoading,
      isError,
      error,
      createNodelessAddressWebhooksModalOpen,
      setCreateNodelessAddressWebhooksModalOpen,
      updateNodelessAddressWebhooksModalOpen,
      setUpdateNodelessAddressWebhooksModalOpen,
    }),
    [
      createNodelessAddressModal,
      nodelessAddress,
      isLoading,
      isError,
      error,
      createNodelessAddressWebhooksModalOpen,
      updateNodelessAddressWebhooksModalOpen,
    ]
  );

  return (
    <NodelessAddressContext.Provider value={value}>
      {props.children}
    </NodelessAddressContext.Provider>
  );
};

export { NodelessAddressContextProvider, NodelessAddressContext };
