import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";

const rootReducer=combineReducers({
    auth:authSlice,
    cart:cartSlice,
    user:profileSlice
})

export default rootReducer;