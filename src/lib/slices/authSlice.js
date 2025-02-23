// "use client";

// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: initialUser,
//     token: storedToken,
//   },
//   reducers: {
//     login: (state, action) => {
//       const token = action.payload;
//       localStorage.setItem("token", token);
//       state.token = token;
//       state.user = getUserFromToken(token);
//     },
//     logout: (state) => {
//       localStorage.removeItem("token");
//       state.token = null;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
