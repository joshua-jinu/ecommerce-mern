import { setEmail } from "./UserSlice";

export const setUserEmail = async (email) => (dispatch) => {
  setEmail(email);
};
