import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../interface-adapters/context/AuthContext";
import { LoadingScreenPage } from "../../../interface-adapters/components/Pages";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("protectedLayout");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : <LoadingScreenPage />;
};
