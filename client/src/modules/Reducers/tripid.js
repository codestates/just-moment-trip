import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trip_id: null,
};
const tripIdSlice = createSlice({
  name: 'tripId',
  initialState,
  reducers: {
    postTripId(state, action) {
      state.trip_id = action.payload;
    },
  },
  extraReducers: {},
});

export const { postTripId } = tripIdSlice.actions;
export default tripIdSlice.reducer;
