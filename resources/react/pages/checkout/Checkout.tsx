import React from "react";
import CheckoutContent from "./components/CheckoutContent";
import CheckoutContextProvider from "../../contexts/CheckoutContext";

const Checkout = () => {
  return (
    <CheckoutContextProvider>
      <CheckoutContent />
    </CheckoutContextProvider>
  );
};

export default Checkout;
