import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts";

export const ProtectedRoute = ({ children }) => {
  const [user] = useUser();

  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return <></>;
  }

  return <>{children}</>;
};
