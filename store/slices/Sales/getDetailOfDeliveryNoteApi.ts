import GetDetailOfDeliveryNoteAPi from '@/services/api/Sales/get-detail-delivery-note-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetDetailOfDeliveryNote: any = createAsyncThunk(
  'detailOfDeliveryNote/getDetailOfDeliveryNote',
  async (params: any) => {
    const DetailOfDeliveryNoteData: any =
      await GetDetailOfDeliveryNoteAPi(params);
    console.log('DetailOfDeliveryNoteData res', DetailOfDeliveryNoteData);
    return DetailOfDeliveryNoteData;
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

export const GetDetailOfDeliveryNoteDataScreen = createSlice({
  name: 'detailOfDeliveryNote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDetailOfDeliveryNote.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
      state.docStatus = '';
    });
    builder.addCase(GetDetailOfDeliveryNote.fulfilled, (state, action) => {
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
    builder.addCase(GetDetailOfDeliveryNote.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';
      state.docStatus = '';
      state.error = 'failed to store data';
    });
  },
});

export const get_detail_delivery_note_data = (state: RootState) =>
  state.GetDetailOfDeliveryNoteDataScreen;

export default GetDetailOfDeliveryNoteDataScreen.reducer;
