import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../interface-adapters/context/AuthContext";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { isDataVaultUnlocked, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isDataVaultUnlocked) {
      navigate("/auth/data-vault");
    }
  }, [isAuthenticated, isDataVaultUnlocked, navigate]);

  return <Outlet />;
};
