import GetDetailOfDeliveryNoteAPi from '@/services/api/Sales/get-detail-delivery-note-api';
import GetDetailOfSalesReturnAPi from '@/services/api/Sales/salesReturn/get-detail-of-sales-return-api';
import GetDetailPageApi from '@/services/api/general/get-detailpage-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetDetailOfStockTransfer: any = createAsyncThunk(
  'detailOfStockTransfer/getDetailOfStockTransfer',
  async (params: any) => {
    const DetailOfStockTransferData: any = await GetDetailPageApi(params);
    console.log('DetailOfStockTransferData res', DetailOfStockTransferData);
    return DetailOfStockTransferData;
  }
);

interface RepoStockTransferState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoStockTransferState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetDetailOfStockTransferScreen = createSlice({
  name: 'detailOfStockTransfer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDetailOfStockTransfer.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
      state.docStatus = '';
    });
    builder.addCase(GetDetailOfStockTransfer.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;
        state.docStatus = action?.payload?.data?.message?.data[0]?.docstatus;
        state.isLoading = 'succeeded';
      } else {
        state.data = '';
        state.docStatus = '';
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(GetDetailOfStockTransfer.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';
      state.docStatus = '';
      state.error = 'failed to store data';
    });
  },
});

export const get_detail_stock_transfer_data = (state: RootState) =>
  state.GetDetailOfStockTransferScreen;

export default GetDetailOfStockTransferScreen.reducer;
