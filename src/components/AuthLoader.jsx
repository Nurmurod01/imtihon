"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slices/authSlice";
const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user && token) {
        dispatch(login({ user, token }));
      }
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
