import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signReducer from './Reducers/userReducer';
import tripReducer from './Reducers/tripReducer';
import tripIdReducer from './Reducers/tripid';

const rootReducer = combineReducers({
  sign: signReducer,
  trip: tripReducer,
  tripId: tripIdReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
