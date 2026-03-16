"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until localStorage is checked

  // On mount — rehydrate from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("bitss_token");
      const storedUser = localStorage.getItem("bitss_user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Corrupted storage — clear it
      localStorage.removeItem("bitss_token");
      localStorage.removeItem("bitss_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Call this after successful login
  function saveAuth(responseData) {
    const accessToken = responseData.data.access_token;
    const userData = responseData.data.user;

    // Save to state
    setToken(accessToken);
    setUser(userData);

    // Save to localStorage
    localStorage.setItem("bitss_token", accessToken);
    localStorage.setItem("bitss_user", JSON.stringify(userData));
  }

  // Call this on logout
  function clearAuth() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("bitss_token");
    localStorage.removeItem("bitss_user");
  }

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAuthenticated, saveAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
