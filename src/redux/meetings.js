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
    deleteMeetingById: (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload
      );
    },
  },
});

export const { setMeetings, deleteMeetingById } = meetingsSlice.actions;
export default meetingsSlice.reducer;
