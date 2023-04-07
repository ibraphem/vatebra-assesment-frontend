import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import layoutSlice from "./layoutSlice";
import userSlice from "./userSlice";
import chartSlice from "./chartSlice";
import listSlice from "./listSlice";

const combinedSlices = combineReducers({
  layout: layoutSlice,
  calendar: calendarSlice,
  user: userSlice,
  chart: chartSlice,
  list: listSlice
});

export default combinedSlices;
