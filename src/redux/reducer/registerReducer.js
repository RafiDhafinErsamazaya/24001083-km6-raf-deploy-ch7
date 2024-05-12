import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  error: null,
  email: "",
  name: "",
  password: "",
};

const authSlice = createSlice({
  name: "register",
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
    registerSuccess: (state) => {
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  setEmail,
  setName,
  setPassword,
} = authSlice.actions;

export default authSlice.reducer;
