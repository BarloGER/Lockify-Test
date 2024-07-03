import { useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../interface-adapters/context/AuthContext";
import { LoadingScreenPage } from "../../../interface-adapters/components/Pages";
import { NavBar } from "../../../interface-adapters/components/organisms";

export const GlobalLayout = () => {
  const { user, isBlocked, isAuthenticated, loadingAuthRequest } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loadingAuthRequest) {
      return;
    }

    const path = location.pathname;
    const isExceptionPath = path === "/register" || path === "/forgot-password";

    if (!isExceptionPath) {
      if (isBlocked) {
        navigate("/blocked");
      } else if (!isAuthenticated) {
        navigate("/login");
      } else if (user && !user.isVerified) {
        navigate("/confirm-email");
      }
    }
  }, [
    isBlocked,
    isAuthenticated,
    user,
    navigate,
    loadingAuthRequest,
    location.pathname,
  ]);

  if (loadingAuthRequest) {
    return <LoadingScreenPage />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
