import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../interface-adapters/context/AuthContext";
import { DataVaultContext } from "../../../interface-adapters/context/DataVaultContext";
import { LoadingScreenPage } from "../../../interface-adapters/components/Pages";
import { SecondaryNavigationBar } from "../../../interface-adapters/components/organisms/SecondaryNavigationBar";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isBlocked } = useContext(AuthContext);
  const { isDataVaultUnlocked, dataVaultLoadingRequest } =
    useContext(DataVaultContext);

  useEffect(() => {
    if (isBlocked) navigate("/blocked");
    else if (!isAuthenticated) navigate("/login");
    else if (!isDataVaultUnlocked) navigate("/data-vault");
  }, [
    dataVaultLoadingRequest,
    isAuthenticated,
    isBlocked,
    isDataVaultUnlocked,
    navigate,
  ]);

  if (dataVaultLoadingRequest) return <LoadingScreenPage />;

  return (
    <>
      <SecondaryNavigationBar />
      <Outlet />
    </>
  );
};
