import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_APP_API_URL;

const initialState = {
  token: null,
  loginStatus: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/api/auth`, {
        email,
        password,
      });
      // here it returns all items from sendResponse(res, 200, token, "User logged in successfully"); which are status, data, message.
      return response.data;
    } catch (err) {
      // here it returns all items from sendResponse(res, 400, null, "Invalid email or password"); which are status, data, message.
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginStatus = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loginStatus = false;
        state.token = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginStatus = true;
        // action.payload is the response.data from the userLogin thunk, so use action.payload.data to get the token itself
        state.token = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginStatus = false;
        state.token = null;
        //if rejected, the action only return error object, so use action.error.message to get the error message
        state.error = action.payload.message;
      });
  },
});

export const { logout } = loginSlice.actions;
export const selectLoginState = (state) => state.login;
export default loginSlice.reducer;
