import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "Users Slice",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
      return state;
    },
  },
});

const UserReducer = userSlice.reducer;
export const { setEmail } = userSlice.actions;

export default UserReducer;
