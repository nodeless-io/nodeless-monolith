import React, { useState, useEffect, createContext, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

export const PaywallMetricsContext = createContext<{
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

export const PaywallMetricsContextProvider = (props) => {
  const [revenueData, setRevenueData] = useState({});
  const [currentTab, setCurrentTab] = useState("Y");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    isLoading: dailyIsLoading,
    isError: dailyIsError,
    data: dailyData,
  } = useQuery(`paywall-metrics-daily`, async () => {
    return await useFetch("/paywall/metrics/revenue/all/today");
  });

  const {
    isLoading: monthlyIsLoading,
    isError: monthlyIsError,
    data: monthlyData,
  } = useQuery(`paywall-metrics-monthly`, async () => {
    return await useFetch(`/paywall/metrics/revenue/all/last-thirty-days`);
  });

  const {
    isLoading: yearlyIsLoading,
    isError: yearlyIsError,
    data: yearlyData,
  } = useQuery(`paywall-metrics-yearly`, async () => {
    return await useFetch(`/paywall/metrics/revenue/all/all-time`);
  });

  useEffect(() => {
    switch (currentTab) {
      case "D":
        setIsError(dailyIsError);
        setIsLoading(dailyIsLoading);
        setRevenueData(dailyData?.data);
        break;
      case "M":
        setIsError(monthlyIsError);
        setIsLoading(monthlyIsLoading);
        setRevenueData(monthlyData?.data);
        break;
      case "Y":
      default:
        setIsError(yearlyIsError);
        setIsLoading(yearlyIsLoading);
        setRevenueData(yearlyData?.data);
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
    setRevenueData(yearlyData?.data);
  }, [yearlyData]);

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
    <PaywallMetricsContext.Provider value={value}>
      {props.children}
    </PaywallMetricsContext.Provider>
  );
};
