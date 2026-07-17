import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Logged-in user
  const [user, setUser] = useState(null);

  // JWT token
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Initial loading state
  const [loading, setLoading] = useState(true);

  /**
   * Login
   */
  const login = async (credentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  /**
   * Logout
   */
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  /**
   * Load current user on app startup
   */
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getProfile();

        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook
 */
export const useAuth = () => useContext(AuthContext);