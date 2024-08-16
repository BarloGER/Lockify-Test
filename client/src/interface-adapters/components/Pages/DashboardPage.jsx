import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor";
import { DataVaultContext } from "../../context/DataVaultContext";
import { DashboardSecurityCheck } from "../organisms";
import { DashboardTemplate } from "../templates/Dashboard-Template";

export const DashboardPage = () => {
  const cryptographyInteractor = useMemo(
    () => new CryptographyInteractor(),
    [],
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

  return (
    <DashboardTemplate>
      <section className="dashboard-template__section">
        {<DashboardSecurityCheck securityCheckResult={securityCheckResult} />}
      </section>
    </DashboardTemplate>
  );
};
