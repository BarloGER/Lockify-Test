import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, userInteractor }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userInteractor.getUser();
      if (response.success) {
        setUser(response.user.dataValues);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || "No active session");
      }
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [userInteractor]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userInteractor: PropTypes.object.isRequired,
};
