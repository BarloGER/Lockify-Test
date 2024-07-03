import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const DashboardPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return;
  }

  return <h1>Dashboard</h1>;
};
