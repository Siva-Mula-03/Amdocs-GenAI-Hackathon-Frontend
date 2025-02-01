import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// Define the slices for your state (e.g., auth, profile)
const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isAuthenticated: false },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: { user: { firstName: "", lastName: "", image: "" } },
  reducers: {
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
    updateDisplayPicture: (state, action) => {
      state.user.image = action.payload;
    },
  },
});

// Combine reducers into rootReducer
const rootReducer = {
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
};

// Configure Redux store
const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Export actions for use in components
export const { login, logout } = authSlice.actions;
export const { updateProfile, updateDisplayPicture } = profileSlice.actions;
