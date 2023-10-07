import React, { useState, createContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/useFetch";

const DashboardContext = createContext<{
  dashboardData: any;
  isLoading: boolean;
}>({
  dashboardData: {},
  isLoading: false,
});

function DashboardContextProvider(props) {
  const [dashboardData, setDashboardData] = useState({});

  const { data, isLoading } = useQuery("dashboard", async () => {
    return await useFetch("/dashboard");
  });

  useEffect(() => {
    if (data) {
      setDashboardData(data?.data);
    }
  }, [data]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        isLoading,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardContextProvider };
