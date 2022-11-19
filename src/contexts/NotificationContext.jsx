import React, { createContext, useContext, useState } from "react";
import { createId } from "../utils/helpers";

const NotificationCTX = createContext(null);

export const NotificationContext = ({ children }) => {
  const notificationState = useState({});

  return (
    <NotificationCTX.Provider value={notificationState}>
      {children}
    </NotificationCTX.Provider>
  );
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useContext(NotificationCTX);

  const notify = ({ message, type }) => {
    const id = createId();
    return setNotifications((prevNoti) => {
      return {
        ...prevNoti,
        [id]: { message, type },
      };
    });
  };

  const removeNotification = (id) => {
    return setNotifications((currentNoti) => {
      const dummy = { ...currentNoti };
      delete dummy[id];
      return dummy;
    });
  };

  return {
    notifications,
    notify,
    removeNotification,
  };
};
