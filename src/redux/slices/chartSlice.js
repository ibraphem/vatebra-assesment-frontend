import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  chartData: [],
  filterable: [],
  loading: false,
  error: null,
  startDate: "2023-04-01",
  endDate: "2023-04-30",
};

export const fetchChartData = createAsyncThunk("chart/fetch", async () => {
  return httpRequest(`${BASE_URL}/chart`);
});

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    filterChart: (state, { payload }) => {
        console.log(state.startDate);
      state.chartData = current(state.filterable).filter(
        (data) => data.date >= state.startDate && data?.date <= state.endDate
      );
    },
    updateStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    updateEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchChartData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.loading = false;
      state.filterable = action.payload.data;
      state.chartData = action.payload.data.filter(
        (data) => data.date >= state.startDate && data?.date <= state.endDate
      );
      state.error = null;
    });
    builder.addCase(fetchChartData.rejected, (state, action) => {
      state.loading = false;
      state.chartData = null;
      state.error = action?.payload?.message;
    });
  },
});

export default chartSlice.reducer;
export const { filterChart, updateStartDate, updateEndDate } = chartSlice.actions;
