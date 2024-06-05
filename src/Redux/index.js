import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import courseReducer from "./slices/courseSlice"
import viewCourseSlice from "./slices/viewCourseSlice";

const rootReducer=combineReducers({
    auth:authSlice,
    cart:cartSlice,
    profile:profileSlice,
    course: courseReducer,
    viewCourse: viewCourseSlice,
})

export default rootReducer;