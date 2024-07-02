import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../interface-adapters/context/AuthContext";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { isDataVaultUnlocked } = useContext(AuthContext);

  useEffect(() => {
    if (!isDataVaultUnlocked) {
      navigate("/auth/data-vault");
    }
  }, [isDataVaultUnlocked, navigate]);

  return <Outlet />;
};
