import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInApi, signUpApi, signOutApi } from '../../services/sign';

const user = JSON.parse(localStorage.getItem('user'));

export const signUp = createAsyncThunk(
  'sign/up',
  async ({ email, nickname, password }) => {
    const response = await signUpApi(email, nickname, password);
    return response.data;
  },
);

export const signIn = createAsyncThunk(
  'sign/in',
  async ({ email, password }) => {
    const data = await signInApi(email, password);
    return { user: data };
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
