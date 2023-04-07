import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import {BASE_URL}  from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  tasks: [],
  filterable: [],
  loading: false,
  error: null
};

export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async () => {return httpRequest(`${BASE_URL}/task`)}
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    filterCalendar: (state, {payload}) => {
      console.log(payload);
      let alltasks = current(state.filterable)
      state.tasks = payload === "all" ? alltasks : alltasks.filter((filt) => filt.category === payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      let activities = action.payload?.data?.map((item) => {
        return {
          start: new Date(item?.date),
          end: new Date(item?.date),
          allDay: true,
          title: item?.todo,
          category: item?.category,
          backgroundColor:
            item?.category === "done"
              ? "green"
              : item?.category === "pending"
              ? "orange"
              : "grey",
        };
      });
      state.tasks = activities;
      state.filterable = activities
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = null;
      state.error = action?.payload?.message;
    });
  },
});

export default calendarSlice.reducer;
export const { filterCalendar } = calendarSlice.actions;
