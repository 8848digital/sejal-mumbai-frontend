import GetSpecificPurchaseReceiptData from '@/services/api/PurchaseReceipt/get-specific-purchase-receipt-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

export const getSpecificReceipt: any = createAsyncThunk(
  'specificReceipt/getSpecificReceipt',
  async (params: any) => {
    const SpecificReceiptData: any =
      await GetSpecificPurchaseReceiptData(params);
    console.log('SpecificReceiptData res', SpecificReceiptData);
    return SpecificReceiptData;
  }
);

interface RepoSpecificReceiptState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoSpecificReceiptState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetSpecificReceiptDataScreen = createSlice({
  name: 'specificReceipt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecificReceipt.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
      state.docStatus = '';
    });
    builder.addCase(getSpecificReceipt.fulfilled, (state, action) => {
      // console.log('first', action?.payload?.data?.message[0].docstatus);
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
    builder.addCase(getSpecificReceipt.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';
      state.docStatus = '';
      state.error = 'failed to store data';
    });
  },
});

export const get_specific_receipt_data = (state: RootState) =>
  state.GetSpecificReceiptDataScreen;

export default GetSpecificReceiptDataScreen.reducer;
