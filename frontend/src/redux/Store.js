import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
