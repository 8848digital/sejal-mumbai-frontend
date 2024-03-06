// import getClientGroupApi from '@/services/api/Master/get-client-group-api';
// import { RootState } from '@/store/root-reducer';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const getClientGroupData: any = createAsyncThunk(
//   'getClientGroupData/ClientGroupData',
//   async (params: any) => {
//     const ClientGroupData: any = await getClientGroupApi(params);
//     console.log('inside slice', ClientGroupData);
//     return ClientGroupData;
//   }
// );
// console.log('inside slice', getClientGroupData);
// interface RepoClientGroupDataState {
//   data: any;
//   docStatus: any;
//   error: string;
//   isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

// const initialState: RepoClientGroupDataState = {
//   data: '',
//   docStatus: '',
//   error: '',
//   isLoading: 'idle',
// };

// export const GetClientGroupDataScreen = createSlice({
//   name: 'ClientGroupData',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getClientGroupData.pending, (state) => {
//       state.isLoading = 'pending';
//     });
//     builder.addCase(getClientGroupData.fulfilled, (state, action) => {
//       if (
//         action?.payload?.status === 200 &&
//         action?.payload?.data?.message?.status === 'success'
//       ) {
//         state.data = action?.payload?.data?.message?.data;
//         state.isLoading = 'succeeded';
//       } else {
//         state.data = '';
//         // state.docStatus = '';
//         state.isLoading = 'succeeded';
//       }
//     });
//     builder.addCase(getClientGroupData.rejected, (state) => {
//       state.isLoading = 'failed';
//       state.error = 'failed to store data';
//     });
//   },
// });

// export const get_client_group_data = (state: RootState) =>
//   state.GetClientGroupDataScreen;

// export default GetClientGroupDataScreen.reducer;
