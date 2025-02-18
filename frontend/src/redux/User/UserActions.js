import { setEmail } from "./UserSlice.js";

export const setUserEmail = (email) => (dispatch) => {
  dispatch(setEmail(email));
  return;
};
