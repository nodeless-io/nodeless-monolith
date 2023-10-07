import React, { useState, createContext, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "react-query";

const UserNotificationContext = createContext<{
  notifications: any;
}>({
  notifications: {},
});

function UserNotificationContextProvider(props) {
  const [notifications, setNotifications] = useState({});

  const { data } = useQuery(`user-notifications`, async () => {
    return await useFetch("/user/notification-settings");
  });

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  return (
    <UserNotificationContext.Provider value={{ notifications }}>
      {props.children}
    </UserNotificationContext.Provider>
  );
}

export { UserNotificationContext, UserNotificationContextProvider };
