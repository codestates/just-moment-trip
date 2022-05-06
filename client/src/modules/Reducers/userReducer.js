import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInApi, signUpApi, signOutApi } from '../../services/sign';

const user = JSON.parse(localStorage.getItem('user'));

export const signUp = createAsyncThunk(
  'sign/up',
  async ({ email, nickname, password }) => {
    try {
      const response = await signUpApi(email, nickname, password);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const signIn = createAsyncThunk(
  'sign/in',
  async ({ email, password }) => {
    try {
      const data = await signInApi(email, password);
      return { user: data };
    } catch (err) {
      console.log(err);
    }
  },
);

export const signOut = createAsyncThunk('sign/out', async () => {
  await signOutApi();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const signSlice = createSlice({
  name: 'sign',
  initialState,
  extraReducers: {
    [signUp.fulfilled]: state => {
      state.isLoggedIn = false;
    },
    [signUp.rejected]: state => {
      state.isLoggedIn = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [signIn.rejected]: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [signOut.fulfilled]: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = signSlice;
export default reducer;
