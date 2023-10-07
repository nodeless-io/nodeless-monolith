import React, { useState, createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AppContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: (value: boolean) => {},
});

function AppContextProvider(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = new QueryClient({});

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
