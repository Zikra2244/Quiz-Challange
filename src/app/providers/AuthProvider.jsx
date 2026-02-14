import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const USER_STORAGE_KEY = "quiz_app_user";
const SESSION_TIMEOUT = 30 * 60 * 1000;

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser.expiry && Date.now() < parsedUser.expiry) {
            setUser(parsedUser);
            setSessionExpiry(parsedUser.expiry);
          } else {
            localStorage.removeItem(USER_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!sessionExpiry) return;

    const timeUntilExpiry = sessionExpiry - Date.now();
    if (timeUntilExpiry <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeUntilExpiry);

    return () => clearTimeout(timer);
  }, [sessionExpiry]);

  const login = useCallback((username) => {
    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length < 3
    ) {
      throw new Error("Username must be at least 3 characters");
    }

    const sanitizedUsername = username.trim().replace(/[<>]/g, "");

    const expiry = Date.now() + SESSION_TIMEOUT;
    const userData = {
      username: sanitizedUsername,
      loginTime: new Date().toISOString(),
      expiry,
      sessionId:
        crypto.randomUUID?.() || Math.random().toString(36).substring(7),
    };

    setUser(userData);
    setSessionExpiry(expiry);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSessionExpiry(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("quiz_state");
  }, []);

  const refreshSession = useCallback(() => {
    if (user) {
      const newExpiry = Date.now() + SESSION_TIMEOUT;
      const updatedUser = {
        ...user,
        expiry: newExpiry,
      };
      setUser(updatedUser);
      setSessionExpiry(newExpiry);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshSession,
    }),
    [user, loading, login, logout, refreshSession],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
