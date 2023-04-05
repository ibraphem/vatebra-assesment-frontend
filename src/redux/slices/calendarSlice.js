import { createSlice, current } from "@reduxjs/toolkit";
import { projectData } from "../../mock/project";

const initialState = {
  tasks: [],
  filterable: []
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateCalendar: (state) => {
      let activities = projectData?.map((item) => {
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
    },
    filterCalendar: (state, {payload}) => {
      console.log(payload);
      let alltasks = current(state.filterable)
      // console.log(alltasks);
      state.tasks = payload === "all" ? alltasks : alltasks.filter((filt) => filt.category === payload)
    }
  },
});

export default calendarSlice.reducer;
export const { updateCalendar, filterCalendar } = calendarSlice.actions;
