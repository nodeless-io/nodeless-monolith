import React, { useState, createContext, useMemo, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { message } from "antd";
import { APP_ROUTES } from "../../pages/app.routes";
import { useNavigate } from "react-router-dom";
import { PaginationLength } from "../../pages/components/constants";

const withdrawFundsRequestInitialState = {
  amount: null,
  type: "address",
  tab: 0,
  address: "",
  withdrawResponse: {},
};

export const WithdrawContext = createContext<{
  withdrawals: any[];
  isLoading: boolean;
  isError: boolean;
  withdrawFundsModalOpen: boolean;
  withdrawFundsRequest: {
    amount: number | number;
    type: string;
    tab: number;
    address: string;
    withdrawResponse: any;
  };
  setWithdrawFundsRequest: (data) => void;
  handleWithdrawFundsModalOpen: () => void;
  handleWithdrawFundsModalClose: () => void;
  viewWithdrawalModalOpen: boolean;
  setViewWithdrawalModalOpen: (value) => void;
  currentWithdrawal: any;
  setCurrentWithdrawal: (value: any) => void;
  withdrawalMetrics: any;
  withdrawalSettings: any;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  count: number;
  refetch: any;
}>({
  withdrawals: [],
  isLoading: false,
  isError: false,
  withdrawFundsModalOpen: false,
  withdrawFundsRequest: withdrawFundsRequestInitialState,
  setWithdrawFundsRequest: () => {},
  handleWithdrawFundsModalOpen: () => {},
  handleWithdrawFundsModalClose: () => {},
  viewWithdrawalModalOpen: false,
  setViewWithdrawalModalOpen: (value) => {},
  currentWithdrawal: {},
  setCurrentWithdrawal: (value) => {},
  withdrawalMetrics: {},
  withdrawalSettings: {},
  page: 0,
  setPage: (value: number) => {},
  rowsPerPage: PaginationLength,
  count: 0,
  refetch: () => {},
});

const WithdrawContextProvider = (props) => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawFundsModalOpen, setWithdrawFundsModalOpen] = useState(false);
  const [withdrawFundsRequest, setWithdrawFundsRequest] = useState(
    withdrawFundsRequestInitialState
  );
  const [viewWithdrawalModalOpen, setViewWithdrawalModalOpen] = useState(false);
  const [currentWithdrawal, setCurrentWithdrawal] = useState({});
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(PaginationLength);
  const rowsPerPage = PaginationLength;
  const [withdrawalMetrics, setWithdrawalMetrics] = useState({});
  const [withdrawalSettings, setWithdrawalSettings] = useState({});
  const handleWithdrawFundsModalOpen = () => {
    setWithdrawFundsModalOpen(true);
  };

  const handleWithdrawFundsModalClose = () => {
    setWithdrawFundsModalOpen(false);
    setWithdrawFundsRequest(withdrawFundsRequestInitialState);
  };

  const { isLoading, isError, data, refetch } = useQuery(
    `withdrawals`,
    async () => {
      return await useFetch(`/withdrawal?page=${page + 1}`);
    }
  );

  const { data: withdrawalMetricsData } = useQuery(
    `withdrawal-metrics`,
    async () => {
      return await useFetch("/withdrawal/metrics");
    }
  );

  const { data: withdrawalSettingsData } = useQuery(
    `withdrawal-settings`,
    async () => {
      return await useFetch("/withdrawal/settings");
    }
  );

  useEffect(() => {
    if (withdrawalSettingsData) {
      setWithdrawalSettings(withdrawalSettingsData?.data);
    }
  }, [withdrawalSettingsData]);

  useEffect(() => {
    if (withdrawalMetricsData) {
      setWithdrawalMetrics(withdrawalMetricsData?.data);
    }
  }, [withdrawalMetricsData]);

  useEffect(() => {
    if (isError) {
      message.warning("Please update your withdrawal settings");
    }

    if (data) {
      setWithdrawals(data?.data);
      setCount(data.meta.total);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const value = useMemo(
    () => ({
      withdrawals,
      isLoading,
      isError,
      withdrawFundsModalOpen,
      withdrawFundsRequest,
      setWithdrawFundsRequest,
      handleWithdrawFundsModalClose,
      handleWithdrawFundsModalOpen,
      viewWithdrawalModalOpen,
      setViewWithdrawalModalOpen,
      currentWithdrawal,
      setCurrentWithdrawal,
      withdrawalMetrics,
      withdrawalSettings,
      page,
      setPage,
      rowsPerPage,
      count,
      refetch,
    }),
    [
      withdrawals,
      isLoading,
      isError,
      withdrawFundsModalOpen,
      withdrawFundsRequest,
      viewWithdrawalModalOpen,
      currentWithdrawal,
      withdrawalMetrics,
      withdrawalSettings,
      page,
      count,
    ]
  );

  return (
    <WithdrawContext.Provider value={value}>
      {props.children}
    </WithdrawContext.Provider>
  );
};

export default WithdrawContextProvider;
