import React, { useState, createContext, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

const UserContext = createContext<{
  user: any;
  twoFactorDetails: any;
  setTwoFactorDetails: (data) => void;
  apiTokens: any[];
  createAPITokenModal: boolean;
  setCreateAPITokenModal: (data) => void;
  viewAPITokenModal: boolean;
  setViewAPITokenModal: (data) => void;
  token: string;
  setToken: (data) => void;
  referralData: any;
  disable2faModalOpen: boolean;
  setDisable2faModalOpen: (value) => void;
}>({
  user: {},
  twoFactorDetails: {},
  setTwoFactorDetails: (data) => {},
  apiTokens: [],
  createAPITokenModal: false,
  setCreateAPITokenModal: (data) => {},
  viewAPITokenModal: false,
  setViewAPITokenModal: (data) => {},
  setToken: (data) => {},
  token: "",
  referralData: {},
  disable2faModalOpen: false,
  setDisable2faModalOpen: (value) => {},
});

function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [twoFactorDetails, setTwoFactorDetails] = useState({});
  const [apiTokens, setApiTokens] = useState([]);
  const [createAPITokenModal, setCreateAPITokenModal] = useState(false);
  const [viewAPITokenModal, setViewAPITokenModal] = useState(false);
  const [token, setToken] = useState("");
  const [referralData, setReferralData] = useState({});
  const [disable2faModalOpen, setDisable2faModalOpen] = useState(false);

  const { data } = useQuery(`user`, async () => {
    return await useFetch("/user");
  });

  const { data: apiTokenData } = useQuery(`api-tokens`, async () => {
    return await useFetch("/user/api-tokens");
  });

  const { data: referralAPIData } = useQuery(`referral`, async () => {
    return await useFetch("/user/referral");
  });

  useEffect(() => {
    if (apiTokenData) {
      setApiTokens(apiTokenData?.tokens);
    }
  }, [apiTokenData]);

  useEffect(() => {
    if (data) {
      setUser(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (referralAPIData) {
      setReferralData(referralAPIData?.data);
    }
  }, [referralAPIData]);

  return (
    <UserContext.Provider
      value={{
        user,
        twoFactorDetails,
        apiTokens,
        setTwoFactorDetails,
        createAPITokenModal,
        setCreateAPITokenModal,
        viewAPITokenModal,
        setViewAPITokenModal,
        token,
        setToken,
        referralData,
        disable2faModalOpen,
        setDisable2faModalOpen,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
