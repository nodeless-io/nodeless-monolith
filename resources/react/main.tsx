import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./contexts/AppContext";
import PageLoader from "./pages/components/loaders/PageLoader";
import ThemeProvider from "./pages/components/theme/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Suspense fallback={<PageLoader />}>
      <Router>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </Router>
    </Suspense>
  </ThemeProvider>
);
