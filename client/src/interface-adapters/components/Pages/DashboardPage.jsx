import { useContext, useEffect } from "react";
import { DataVaultContext } from "../../context/DataVaultContext";

export const DashboardPage = () => {
  const {
    accounts,
    contacts,
    notes,
    banks,
    dataVaultLoadingRequest,
    masterPassword,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  useEffect(() => {
    if (
      !dataVaultLoadingRequest &&
      masterPassword &&
      isDataVaultUnlocked &&
      (!accounts || !contacts || !notes || !banks)
    ) {
      console.log("Loading Data...");
    }
  }, [
    dataVaultLoadingRequest,
    masterPassword,
    isDataVaultUnlocked,
    accounts,
    contacts,
    notes,
    banks,
  ]);

  if (dataVaultLoadingRequest) {
    return <div>Loading...</div>; // or a loading component
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Display data */}
    </div>
  );
};
