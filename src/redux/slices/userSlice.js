import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL}  from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    user: null,
    loading: false,
    error: null
};

  export const signin = createAsyncThunk(
    "user/signin",
    async (arg) => {
      return httpRequest(`${BASE_URL}/user/signin`, 'post', arg);
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {


      builder.addCase(signin.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
        state.error = action.payload?.status === false ? action?.payload?.message : "";
      });
      builder.addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action?.payload?.message;
      });
    },
    reducers: {
      removeUser: (state) => {
          state.user = null
      }
  }
  });

  export default userSlice.reducer;
  export const {removeUser} = userSlice.actions