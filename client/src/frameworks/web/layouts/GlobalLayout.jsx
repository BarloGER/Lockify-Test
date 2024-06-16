import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../interface-adapters/context/AuthContext";
import {
  NavBarPage,
  LoadingScreenPage,
} from "../../../interface-adapters/components/Pages";

export const GlobalLayout = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user && !user.isVerified) {
      navigate("/confirm-email");
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
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
