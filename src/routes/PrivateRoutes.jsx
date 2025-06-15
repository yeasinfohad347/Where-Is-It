import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";
import { AuthContext } from "../contexts/AuthContest";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;
