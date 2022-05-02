import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducers/userReducer';

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
