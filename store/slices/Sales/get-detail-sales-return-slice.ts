import GetDetailOfDeliveryNoteAPi from '@/services/api/Sales/get-detail-delivery-note-api';
import GetDetailOfSalesReturnAPi from '@/services/api/Sales/salesReturn/get-detail-of-sales-return-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetDetailOfSalesReturn: any = createAsyncThunk(
  'detailOfSalesReturn/getDetailOfSalesReturn',
  async (params: any) => {
    const DetailOfSalesReturnData: any =
      await GetDetailOfSalesReturnAPi(params);
    console.log('DetailOfSalesReturnData res', DetailOfSalesReturnData);
    return DetailOfSalesReturnData;
  }
);

interface RepoDeliveryNoteState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoDeliveryNoteState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetDetailOfSalesReturnScreen = createSlice({
  name: 'detailOfSalesReturn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDetailOfSalesReturn.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
      state.docStatus = '';
    });
    builder.addCase(GetDetailOfSalesReturn.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;
        state.docStatus = action?.payload?.data?.message?.data?.docstatus;
        state.isLoading = 'succeeded';
      } else {
        state.data = '';
        state.docStatus = '';
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(GetDetailOfSalesReturn.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';
      state.docStatus = '';
      state.error = 'failed to store data';
    });
  },
});

export const get_detail_sales_return_data = (state: RootState) =>
  state.GetDetailOfSalesReturnScreen;

export default GetDetailOfSalesReturnScreen.reducer;
