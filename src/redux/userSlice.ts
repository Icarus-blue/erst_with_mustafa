import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type User = {
  authenticated: boolean;
  user: {
    googleId?: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    img_: string;
    createdAt: Date;
    id_: string;
    access_token: string;
  } | null;
};

const initialState: User = {
  authenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: function (state, action) {
      state.authenticated = true;
      state.user = { ...action.payload };

      if (action.payload.access_token) {
        localStorage.setItem("access_token", state.user?.access_token || "");
        Cookies.set("access_token", action.payload.access_token);        
      }
    },

    logout: function (state, action) {
      state.authenticated = false;
      state.user = null;
      localStorage.clear();
      window.location.href = "/signin";
      Cookies.remove("access_token");
    },

    updateUser: function (state, action) {
      console.log(action.payload);
      state.user = {
        ...action.payload,
        access_token: localStorage.getItem("access_token"),
      };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
