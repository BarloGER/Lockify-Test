import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, userInteractor }) => {
  const [user, setUser] = useState(null);
  const [masterPassword, setMasterPassword] = useState("");
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDataVaultUnlocked, setIsDataVaultUnlocked] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const checkAuthentication = useCallback(async () => {
    setLoadingAuthRequest(true);

    const authenticationResponse = await userInteractor.checkAuthAndGetUser();
    if (
      !authenticationResponse.success &&
      authenticationResponse.errorCode === "USER_AUTHORIZATION_001"
    ) {
      setUser(null);
      setIsBlocked(true);
      setIsAuthenticated(false);
      setLoadingAuthRequest(false);
      return;
    } else if (!authenticationResponse.success) {
      setUser(null);
      setMasterPassword("");
      setIsAuthenticated(false);
      setLoadingAuthRequest(false);
      return;
    }

    setUser(authenticationResponse.user.dataValues);
    setIsAuthenticated(true);

    setLoadingAuthRequest(false);
  }, [userInteractor]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        masterPassword,
        setMasterPassword,
        isAuthenticated,
        setIsAuthenticated,
        isDataVaultUnlocked,
        setIsDataVaultUnlocked,
        isBlocked,
        setIsBlocked,
        loadingAuthRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userInteractor: PropTypes.object.isRequired,
};
