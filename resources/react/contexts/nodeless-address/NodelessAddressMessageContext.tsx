import React, { useState, createContext, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";

const NodelessAddressMessageContext = createContext<{
  nodelessAddressMessageModalOpen: boolean;
  setNodelessAddressMessageModalOpen: (value: boolean) => void;
  currentMessage: any;
  setCurrentMessage: (message: any) => void;
  messages: any[];
  isLoading: boolean;
}>({
  nodelessAddressMessageModalOpen: false,
  setNodelessAddressMessageModalOpen: () => {},
  currentMessage: {},
  setCurrentMessage: (message) => {},
  messages: [],
  isLoading: false,
});

const NodelessAddressMessageContextProvider = (props) => {
  const [
    nodelessAddressMessageModalOpen,
    setNodelessAddressMessageModalOpen,
  ] = useState(false);

  const [currentMessage, setCurrentMessage] = React.useState({});
  const [messages, setMessages] = React.useState([]);

  const { addressId } = useParams();

  const { data, isLoading } = useQuery(
    ["messages" + addressId],
    async () => {
      return await useFetch(`/inbox/${addressId}/message`);
    },
    {
      enabled: !!addressId,
    }
  );

  useEffect(() => {
    if (data) {
      setMessages(data?.data);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      nodelessAddressMessageModalOpen,
      setNodelessAddressMessageModalOpen,
      currentMessage,
      setCurrentMessage,
      isLoading,
      messages,
    }),
    [nodelessAddressMessageModalOpen, currentMessage, isLoading, messages]
  );

  return (
    <NodelessAddressMessageContext.Provider value={value}>
      {props.children}
    </NodelessAddressMessageContext.Provider>
  );
};

export { NodelessAddressMessageContextProvider, NodelessAddressMessageContext };
