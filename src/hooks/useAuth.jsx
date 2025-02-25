"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        localStorage.setItem("userId", decoded.id);
        setUser(decoded?.id);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("JWT dekod qilishda xatolik:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return { isLoggedIn, login, logout, getToken, user };
}
