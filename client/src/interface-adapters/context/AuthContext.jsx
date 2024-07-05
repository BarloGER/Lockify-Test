import PropTypes from "prop-types";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { UserInteractor } from "../../usecases/user/UserInteractor.js";
import { UserRepository } from "../../interface-adapters/repositories/UserRepository.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const userRepository = useMemo(() => new UserRepository(), []);
  const userInteractor = useMemo(
    () => new UserInteractor(userRepository),
    [userRepository]
  );

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

    setIsAuthenticated(true);
    setUser(authenticationResponse.user.dataValues);

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
        userInteractor,
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
};
