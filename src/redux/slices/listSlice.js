import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  lists: [],
  error: null,
  loading: false
};

export const fetchLists = createAsyncThunk("list/fetch", async () => {
  return httpRequest(`${BASE_URL}/list`);
});

const listSlice = createSlice({
  name: "list",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.loading = false;
      state.lists = action.payload.data
      state.error = null;
    });
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.loading = false;
      state.lists = null;
      state.error = action?.payload?.message;
    });
  },
});

export default listSlice.reducer;
