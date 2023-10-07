import React, { useState, createContext, useMemo } from "react";
import { IPaywall } from "../../types/paywalls.interface";

export const PaywallContext = createContext<{
  createPaywallModal: boolean;
  setCreatePaywallModal: (payload: boolean) => void;
  editPaywallModal: boolean;
  setEditPaywallModal: (payload: boolean) => void;
  createPaywallWebhooksModalOpen: boolean;
  setCreatePaywallWebhooksModalOpen: (payload: boolean) => void;
  updatePaywallWebhooksModalOpen: boolean;
  setUpdatePaywallWebhooksModalOpen: (payload: boolean) => void;
  currentPaywall: any;
  setCurrentPaywall: (data) => void;
  viewPaywallModalOpen: boolean;
  setViewPaywallModalOpen: (data) => void;
}>({
  createPaywallModal: false,
  setCreatePaywallModal: () => {},
  editPaywallModal: false,
  setEditPaywallModal: () => {},
  createPaywallWebhooksModalOpen: false,
  setCreatePaywallWebhooksModalOpen: (data) => {},
  updatePaywallWebhooksModalOpen: false,
  setUpdatePaywallWebhooksModalOpen: (data) => {},
  currentPaywall: {} as IPaywall,
  setCurrentPaywall: () => {},
  viewPaywallModalOpen: false,
  setViewPaywallModalOpen: () => {},
});

export const PaywallContextProvider = (props) => {
  const [createPaywallModal, setCreatePaywallModal] = useState(false);
  const [editPaywallModal, setEditPaywallModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [
    createPaywallWebhooksModalOpen,
    setCreatePaywallWebhooksModalOpen,
  ] = useState(false);
  const [
    updatePaywallWebhooksModalOpen,
    setUpdatePaywallWebhooksModalOpen,
  ] = useState(false);
  const [currentPaywall, setCurrentPaywall] = useState({});
  const [viewPaywallModalOpen, setViewPaywallModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      createPaywallModal,
      setCreatePaywallModal,
      editPaywallModal,
      setEditPaywallModal,

      loading,
      setLoading,
      createPaywallWebhooksModalOpen,
      setCreatePaywallWebhooksModalOpen,
      updatePaywallWebhooksModalOpen,
      setUpdatePaywallWebhooksModalOpen,
      currentPaywall,
      setCurrentPaywall,
      viewPaywallModalOpen,
      setViewPaywallModalOpen,
    }),
    [
      createPaywallModal,
      editPaywallModal,

      loading,
      createPaywallWebhooksModalOpen,
      updatePaywallWebhooksModalOpen,
      currentPaywall,
      viewPaywallModalOpen,
    ]
  );

  return (
    <PaywallContext.Provider value={value}>
      {props.children}
    </PaywallContext.Provider>
  );
};
