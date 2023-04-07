import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import layoutSlice from "./layoutSlice";
import userSlice from "./userSlice";

const combinedSlices = combineReducers({
  layout: layoutSlice,
  calendar: calendarSlice,
  user: userSlice
});

export default combinedSlices;
