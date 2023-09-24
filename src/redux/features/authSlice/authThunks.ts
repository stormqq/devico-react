import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";
import { setAuth } from "./authSlice";

interface User {
  uid: string;
  email: string;
  login: string;
  password: string;
}

const api = new API();

export const registerUser = createAsyncThunk<
  User,
  {
    email: string;
    login: string;
    password: string;
  }
>("auth/registerUser", async ({ email, login, password }, { dispatch, rejectWithValue }) => {
  const res = await api.registerUser(email, login, password);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  dispatch(setAuth(true));
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  return res.user;
});



export const loginUser = createAsyncThunk<
  User,
  {
    login: string;
    password: string;
  }
>("auth/loginUser", async ({ login, password }, { dispatch, rejectWithValue }) => {
  const res = await api.loginUser(login, password);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  dispatch(setAuth(true));
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  return res.user;
});
  
export const getUserByToken = createAsyncThunk<
  User
>("auth/getUserByToken", async (_, { dispatch, rejectWithValue }) => {
  const res = await api.getUserByToken();
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  dispatch(setAuth(true));
  localStorage.setItem("accessToken", res.tokens.accessToken);
  localStorage.setItem("refreshToken", res.tokens.refreshToken);
  return res.user;
}
);