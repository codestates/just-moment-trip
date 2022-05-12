import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestTripList } from '../../services/trip';

export const getTrip = createAsyncThunk('trip/get', async () => {
  try {
    const response = await requestTripList();
    return response;
  } catch (err) {
    console.log(err);
  }
});

const initialState = [
  // {
  //   title: '',
  //   country: '',
  //   total_price: 0,
  //   base_currency: '',
  //   start_date: '',
  //   end_date: '',
  // },
];
const tripSlice = createSlice({
  name: 'trip',
  initialState,
  extraReducers: {
    [getTrip.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getTrip.rejected]: state => {
      state.value = null;
    },
  },
});

export default tripSlice.reducer;
