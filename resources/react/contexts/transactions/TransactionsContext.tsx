import React, { useState, createContext } from "react";

const TransactionsContext = createContext<{
  viewTransactionModal: boolean;
  setViewTransactionModal: (data) => void;
  currentTransaction: any;
  setCurrentTransaction: (data) => void;
}>({
  viewTransactionModal: false,
  setViewTransactionModal: (data) => {},
  currentTransaction: {},
  setCurrentTransaction: (data) => {},
});

function TransactionsContextProvider(props) {
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  return (
    <TransactionsContext.Provider
      value={{
        viewTransactionModal,
        setViewTransactionModal,
        currentTransaction,
        setCurrentTransaction,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsContext, TransactionsContextProvider };
