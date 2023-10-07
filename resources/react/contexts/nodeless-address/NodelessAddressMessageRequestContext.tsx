import React, { createContext, useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { INodelessAddressMessageRequest } from "../../types/nodeless-address.interface";

const NodelessAddressMessageRequestContext = createContext<{
  nodelessAddressMessageRequest: any;
  setNodelessAddressMessageRequest: (data) => void;
  isLoading: boolean;
  status: any;
  isError: boolean;
}>({
  nodelessAddressMessageRequest: {},
  setNodelessAddressMessageRequest: (
    nodelessAddressMessageRequest: INodelessAddressMessageRequest
  ) => {},
  isLoading: false,
  status: "new",
  isError: false,
});

function NodelessAddressMessageRequestContextProvider(props) {
  const [
    nodelessAddressMessageRequest,
    setNodelessAddressMessageRequest,
  ] = useState({});
  const [status, setStatus] = useState<string | null>("new");
  const queryClient = useQueryClient();
  const { requestId } = useParams();

  const { data, isLoading, isError } = useQuery(
    "message_request",
    async () => {
      return await useFetch("/gated-inbox/" + requestId);
    },
    {
      enabled: !!requestId,
    }
  );

  const { data: pollingData } = useQuery(
    `inbox-message-poll`,
    async () => {
      return await useFetch("/poll/inbox_message/" + data?.gated_message?.uuid);
    },
    {
      refetchInterval: 2000,
      enabled: status == "new" && !!data?.gated_message?.uuid,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    queryClient.clear();
    setStatus("new");
    queryClient.invalidateQueries([`message_request`]);
    queryClient.invalidateQueries([`inbox-message-poll`]);
  }, []);

  useEffect(() => {
    setNodelessAddressMessageRequest(data);
    setStatus(data?.gated_message?.status);
  }, [data, nodelessAddressMessageRequest]);

  useEffect(() => {
    if (pollingData) {
      setStatus(null);
      setStatus(pollingData?.status);

      if (pollingData?.status == "paid") {
        window.location.reload();
      }
    }
  }, [pollingData, data]);

  const value = useMemo(
    () => ({
      nodelessAddressMessageRequest,
      setNodelessAddressMessageRequest,
      isLoading,
      isError,
      status,
    }),
    [nodelessAddressMessageRequest, data]
  );

  return (
    <NodelessAddressMessageRequestContext.Provider value={value}>
      {props.children}
    </NodelessAddressMessageRequestContext.Provider>
  );
}

export {
  NodelessAddressMessageRequestContext,
  NodelessAddressMessageRequestContextProvider,
};
