import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    signout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, signout } = userSlice.actions;

export default userSlice.reducer;
