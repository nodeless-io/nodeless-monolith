import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const StoreMetricsContext = createContext<{
  revenueData: any;
  setRevenueData: (value: any) => void;
  isLoading: boolean;
  isError: boolean;
  currentTab: "D" | "M" | "Y";
  setCurrentTab: (value: string) => void;
}>({
  revenueData: {},
  setRevenueData: (value: any) => {},
  isLoading: false,
  isError: false,
  currentTab: "Y",
  setCurrentTab: (value: string) => {},
});

export const StoreMetricsContextProvider = (props) => {
  const [revenueData, setRevenueData] = useState({});
  const [currentTab, setCurrentTab] = useState("Y");
  const { storeId } = useParams<{ storeId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    isLoading: dailyIsLoading,
    isError: dailyIsError,
    data: dailyData,
  } = useQuery(
    `revenue-metrics-daily-${storeId}`,
    async () => {
      return await useFetch(`/stores/${storeId}/metrics/revenue/today/hour`);
    },
    {
      enabled: !!storeId,
    }
  );

  const {
    isLoading: monthlyIsLoading,
    isError: monthlyIsError,
    data: monthlyData,
  } = useQuery(
    `revenue-metrics-last-thirty-days-${storeId}`,
    async () => {
      return await useFetch(
        `/stores/${storeId}/metrics/revenue/last-thirty-days/day`
      );
    },
    {
      enabled: !!storeId,
    }
  );

  const {
    isLoading: yearlyIsLoading,
    isError: yearlyIsError,
    data: yearlyData,
  } = useQuery(
    `revenue-metrics-all-time-by-month-${storeId}`,
    async () => {
      return await useFetch(
        `/stores/${storeId}/metrics/revenue/all-time/month`
      );
    },
    {
      enabled: !!storeId,
    }
  );

  useEffect(() => {
    switch (currentTab) {
      case "D":
        setIsError(dailyIsError);
        setIsLoading(dailyIsLoading);
        setRevenueData(dailyData);
        break;
      case "M":
        setIsError(monthlyIsError);
        setIsLoading(monthlyIsLoading);
        setRevenueData(monthlyData);
        break;
      case "Y":
      default:
        setIsError(yearlyIsError);
        setIsLoading(yearlyIsLoading);
        setRevenueData(yearlyData);
        break;
    }
  }, [
    currentTab,
    dailyIsError,
    dailyIsLoading,
    dailyData,
    monthlyIsError,
    monthlyIsLoading,
    monthlyData,
    yearlyIsError,
    yearlyIsLoading,
    yearlyData,
  ]);

  useEffect(() => {
    setRevenueData(yearlyData);
  }, [storeId, yearlyData]);

  const value: any = useMemo(
    () => ({
      isLoading,
      isError,
      revenueData,
      setRevenueData,
      currentTab,
      setCurrentTab,
    }),
    [isLoading, isError, revenueData, currentTab]
  );

  return (
    <StoreMetricsContext.Provider value={value}>
      {props.children}
    </StoreMetricsContext.Provider>
  );
};
