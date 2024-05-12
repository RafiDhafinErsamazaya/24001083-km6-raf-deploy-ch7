import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  error: null,
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.userToken = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
      state.error = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, setEmail, setPassword } =
  authSlice.actions;
export default authSlice.reducer;
