import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User Slice ",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail(state, action) {
      console.log("State update", action);
      state.email = action.payload;
    },
  },
});

// recuder
export const { setEmail } = userSlice.actions;

export default userSlice.reducer;
