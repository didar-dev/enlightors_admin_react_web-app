import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUsersById: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, deleteUsersById } = usersSlice.actions;
export default usersSlice.reducer;
