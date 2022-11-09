import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCTX = createContext(null);

export const AuthContext = ({ children }) => {
  const userState = useState(null);

  useEffect(() => {
    // console.log(sessionStorage.getItem("user"));
    userState[1](sessionStorage.getItem("user"));
  }, []);

  return <AuthCTX.Provider value={userState}>{children}</AuthCTX.Provider>;
};

export const useUser = () => useContext(AuthCTX);
