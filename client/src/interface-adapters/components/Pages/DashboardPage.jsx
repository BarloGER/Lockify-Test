import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor";
import { DataVaultContext } from "../../context/DataVaultContext";
import { Dashboard } from "../organisms";

export const DashboardPage = () => {
  const cryptographyInteractor = useMemo(
    () => new CryptographyInteractor(),
    []
  );

  const {
    accounts,
    contacts,
    notes,
    banks,
    dataVaultLoadingRequest,
    masterPassword,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  const [securityCheckResult, setSecurityCheckResult] = useState(null);

  const checkSecurity = useCallback(async () => {
    if (!accounts) return;

    const accountData = accounts.map((account) => ({
      accountName: account.accountName,
      accountPassword: account.decryptedPassword,
    }));

    const result = await cryptographyInteractor.securityCheck(accountData);
    if (!result.success) {
      return;
    }
    setSecurityCheckResult(result);
  }, [accounts, cryptographyInteractor]);

  useEffect(() => {
    if (
      !dataVaultLoadingRequest &&
      masterPassword &&
      isDataVaultUnlocked &&
      accounts &&
      contacts &&
      notes &&
      banks
    ) {
      checkSecurity();
    }
  }, [
    dataVaultLoadingRequest,
    masterPassword,
    isDataVaultUnlocked,
    accounts,
    contacts,
    notes,
    banks,
    checkSecurity,
  ]);

  if (dataVaultLoadingRequest) {
    return <div>Loading...</div>; // or a loading component
  }

  console.log(securityCheckResult);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {securityCheckResult && (
        <Dashboard
          securityCheckResult={securityCheckResult}
          accounts={accounts}
        />
      )}
    </div>
  );
};
