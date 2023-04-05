import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import layoutSlice from "./layoutSlice";

const combinedSlices = combineReducers({
  layout: layoutSlice,
  calendar: calendarSlice
});

export default combinedSlices;
