import React, { useState, useEffect, useMemo, createContext } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

export const NodelessAddressWebhooksContext = createContext<{
  nodelessAddressWebhooks: any[];
  isLoading: boolean;
}>({
  nodelessAddressWebhooks: [],
  isLoading: false,
});

export const NodelessAddressWebhooksContextProvider = (props) => {
  const [nodelessAddressWebhooks, setNodelessAddressWebhooks] = useState([]);
  const { addressId } = useParams();

  const fetchNodelessAddressWebhooks = async () => {
    return await useFetch(`/bitcoinable_webhook/type/inbox/uuid/${addressId}`);
  };

  const { isLoading, data, refetch } = useQuery(
    "nodeless-address-webhooks",
    fetchNodelessAddressWebhooks,
    {
      enabled: !!addressId,
    }
  );

  useEffect(() => {
    if (data) {
      setNodelessAddressWebhooks(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [addressId]);

  const value = useMemo(
    () => ({
      isLoading,
      nodelessAddressWebhooks,
    }),
    [isLoading, nodelessAddressWebhooks]
  );

  return (
    <NodelessAddressWebhooksContext.Provider value={value}>
      {props.children}
    </NodelessAddressWebhooksContext.Provider>
  );
};
