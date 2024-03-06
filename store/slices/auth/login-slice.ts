import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import getAccessTokenApi from '@/services/api/auth/get-login-api';

export const getAccessToken: any = createAsyncThunk(
  'accessToken/getAccessToken',
  async (param: any) => {
    const AccessTokenData = await getAccessTokenApi(param);
    console.log(AccessTokenData, 'AccessTokenData');
    return AccessTokenData;
  }
);
interface RepoAccessTokenState {
  token: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoAccessTokenState = {
  token: '',
  error: '',
  isLoading: 'idle',
};

export const GetAccessTokenScreen: any = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    ClearToken(state?: any, action?: any) {
      state.token = '';
      state.error = '';
      state.isLoading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.isLoading = 'pending';
      state.token = '';
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      console.log('token payload', action?.payload);
      if (action?.payload?.data?.hasOwnProperty('access_token')) {
        state.token = action?.payload?.data?.access_token;
        state.isLoading = 'succeeded';
        state.error = '';
      }
      if (action?.payload.msg === 'error') {
        state.isLoading = 'succeeded';
        state.error = 'Invalid User Or Password';
        state.token = '';
      }
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.token = '';
      state.error = 'failed to store token';
    });
  },
});

export const get_access_token = (state: RootState) =>
  state.GetAccessTokenScreen;
export const { ClearToken, updateAccessToken }: any =
  GetAccessTokenScreen.actions;

export default GetAccessTokenScreen.reducer;
