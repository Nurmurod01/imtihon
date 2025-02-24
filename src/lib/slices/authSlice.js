import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.user.role;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    loadUser: (state) => {
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (user && token) {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          state.role = role;
        }
      }
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
