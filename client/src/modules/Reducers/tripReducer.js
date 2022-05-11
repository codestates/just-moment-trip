import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestTripList } from '../../services/trip';

export const getTrip = createAsyncThunk('trip/get', async () => {
  try {
    const response = await requestTripList();
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
});

const initialState = [
  {
    title: '',
    country: '',
    total_price: 0,
    base_currency: '',
    start_date: '',
    end_date: '',
  },
];
const tripSlice = createSlice({
  name: 'trip',
  initialState,
  extraReducers: {
    [getTrip.fulfilled]: (state, action) => {
      console.log(action.payload);
      state[0] = action.payload[0];
    },
    [getTrip.rejected]: state => {
      state.title = null;
    },
  },
});

export default tripSlice.reducer;
