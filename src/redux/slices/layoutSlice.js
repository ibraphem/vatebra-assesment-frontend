import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    loader: {
      status: false,
    },
    taskModal: {
      status: false,
    },
  },

  reducers: {
    setLoader: (state, { payload }) => {
      state.loader = {
        status: payload
      };
    },
    setTaskModal: (state, { payload }) => {
      state.taskModal = {
        status: payload
      };
    },
  },
});

export const {setLoader, setTaskModal } = layoutSlice.actions;
export default layoutSlice.reducer;
