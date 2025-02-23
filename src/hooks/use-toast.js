"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

function genId() {
  return Math.random().toString(36).substr(2, 9);
}

function showToast({ message, type = "default" }) {
  toast(message, { type });
}

function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return () => setToasts([]);
  }, []);

  return {
    toast: showToast,
    dismiss: () => toast.dismiss(),
  };
}

export { useToast, showToast as toast };
