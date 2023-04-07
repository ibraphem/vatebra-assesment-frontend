import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import layoutSlice from "./layoutSlice";
import userSlice from "./userSlice";
import chartSlice from "./chartSlice";

const combinedSlices = combineReducers({
  layout: layoutSlice,
  calendar: calendarSlice,
  user: userSlice,
  chart: chartSlice
});

export default combinedSlices;
