import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signReducer from './Reducers/userReducer';
import tripReducer from './Reducers/tripReducer';

const rootReducer = combineReducers({
  sign: signReducer,
  trip: tripReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
