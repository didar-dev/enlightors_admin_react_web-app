import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Auth: null,
};
export const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.Auth = action.payload;
    },
    signout: (state) => {
      state.Auth = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, signout } = userSlice.actions;

export default userSlice.reducer;
