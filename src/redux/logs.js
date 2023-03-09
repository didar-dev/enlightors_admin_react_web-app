import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logs: [],
};
export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
  },
});
export const { setLogs } = logsSlice.actions;
export default logsSlice.reducer;
