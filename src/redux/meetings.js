import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  meetings: [],
};
export const meetingsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setMeetings: (state, action) => {
      state.meetings = action.payload;
    },
  },
});

export const { setMeetings } = meetingsSlice.actions;
export default meetingsSlice.reducer;
