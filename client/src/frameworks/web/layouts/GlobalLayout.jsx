import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../interface-adapters/context/AuthContext";
import {
  NavBarPage,
  LoadingScreenPage,
} from "../../../interface-adapters/components/Pages";

export const GlobalLayout = () => {
  const { user, isBlocked, isAuthenticated, loadingAuthRequest } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isBlocked) {
      navigate("/blocked");
    } else if (!isAuthenticated) {
      navigate("/login");
    } else if (user && !user.isVerified) {
      navigate("/confirm-email");
    }
  }, [isBlocked, isAuthenticated, user, navigate]);

  if (loadingAuthRequest) {
    return <LoadingScreenPage />;
  }

  return (
    <>
      <>
        <NavBarPage />
        <Outlet />
      </>
    </>
  );
};
