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
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const checkAuthentication = useCallback(async () => {
    setLoadingAuthRequest(true);

    const authenticationResponse = await userInteractor.checkAuthAndGetUser();
    if (!authenticationResponse.success && authenticationResponse.user) {
      setUser(null);
      setIsBlocked(true);
      setIsAuthenticated(false);
      setLoadingAuthRequest(false);
      return;
    } else if (!authenticationResponse.success) {
      setUser(null);
      setIsAuthenticated(false);
      setLoadingAuthRequest(false);
      return;
    }

    setUser(authenticationResponse.user);
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
        userInteractor,
        isAuthenticated,
        setIsAuthenticated,
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
