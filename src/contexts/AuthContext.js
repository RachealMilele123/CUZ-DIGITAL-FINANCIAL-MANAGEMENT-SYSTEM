import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenExpiryHandler } from "../utils/apiUtils";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("auth user:", user);

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userToken, userData = null) => {

    localStorage.setItem("authToken", userToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
    setToken(userToken);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get token function
  const getToken = () => {
    return token || localStorage.getItem("authToken");
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const currentToken = getToken();
    return !!currentToken;
  };

  // Handle token expiry
  const handleTokenExpiry = () => {
    console.log("Token expired, logging out user");
    logout();
    // Navigation will be handled by the ProtectedRoute component
    // when isAuthenticated becomes false
  };

  // Register the token expiry handler with the API utils
  useEffect(() => {
    setTokenExpiryHandler(handleTokenExpiry);
  }, []);

  const value = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
    checkAuth,
    user,
    handleTokenExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
