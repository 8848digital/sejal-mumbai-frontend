import GetApi from '@/services/api/general/get-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetStockTransferListing: any = createAsyncThunk(
  'listingOfStockTransfer/getLitingOfStockTransfer',
  async (params: any) => {
    const ListingOfStockTransferData: any = await GetApi(params);
    console.log('ListingOfStockTransferData res', ListingOfStockTransferData);
    return ListingOfStockTransferData;
  }
);

interface RepoStockTransferListingState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoStockTransferListingState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetListingOfStockTransferScreen = createSlice({
  name: 'listingOfStockTransfer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetStockTransferListing.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
      state.docStatus = '';
    });
    builder.addCase(GetStockTransferListing.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;
        // state.docStatus = action?.payload?.data?.message?.data?.docstatus;
        state.isLoading = 'succeeded';
      } else {
        state.data = '';
        state.docStatus = '';
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(GetStockTransferListing.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';
      state.docStatus = '';
      state.error = 'failed to store data';
    });
  },
});

export const get_listing_stock_transfer_data = (state: RootState) =>
  state.GetListingOfStockTransferScreen;

export default GetListingOfStockTransferScreen.reducer;
