import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setAuthInfo } from 'Helpers'
import axios from '../Axios'

export const signIn = createAsyncThunk(
  'sign-in',
  async ({ username, password, navigateToCreate }, { rejectWithValue }) => {
    try {
      const { data: { data } } = await axios.post(process.env.REACT_APP_API_URL + '/auth/sign-in', {
        username,
        password,
      });
      navigateToCreate();
      return data;
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, { payload: { username, password, token } }) => {
      state.username = username;
      state.password = password;
      setAuthInfo(token);
    })
  },
})

export default authSlice.reducer
