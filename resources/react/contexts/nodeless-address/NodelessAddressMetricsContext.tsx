import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const NodelessAddressMetricsContext = createContext<{
  metricsData: any;
  isLoading: boolean;
  isError: boolean;
}>({
  metricsData: {},
  isLoading: false,
  isError: false,
});

export const NodelessAddressMetricsContextProvider = (props) => {
  const [metricsData, setMetricsData] = useState({});

  const { addressId } = useParams<{ addressId: string }>();

  const { isLoading, isError, data } = useQuery(
    `nodeless-address-metrics-${addressId}`,
    async () => {
      return await useFetch(`/inbox/${addressId}/metrics`);
    },
    {
      enabled: !!addressId,
    }
  );

  useEffect(() => {
    setMetricsData(data?.data);
  }, [addressId, data]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      metricsData,
    }),
    [isLoading, isError, metricsData]
  );

  return (
    <NodelessAddressMetricsContext.Provider value={value}>
      {props.children}
    </NodelessAddressMetricsContext.Provider>
  );
};
