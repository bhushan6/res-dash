import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCTX = createContext(null);

export const AuthContext = ({ children }) => {
  const userState = useState(null);

  useEffect(() => {
    userState[1](JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return <AuthCTX.Provider value={userState}>{children}</AuthCTX.Provider>;
};

export const useUser = () => useContext(AuthCTX);
