import ReportApi from '@/services/api/report/get-report-data-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GetItemStatusReport: any = createAsyncThunk(
  'detailItemStatusReport/getitemStatusReport',
  async (token: any, params: any) => {
    const detailItemStatusReportData: any = await ReportApi(token, params);
    console.log('detailItemStatusReportData res', detailItemStatusReportData);
    return detailItemStatusReportData;
  }
);

interface RepoReportState {
  data: any;

  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoReportState = {
  data: '',

  error: '',
  isLoading: 'idle',
};

export const itemStatusReportScreen = createSlice({
  name: 'detailOfSalesReturn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetItemStatusReport.pending, (state) => {
      state.isLoading = 'pending';
      state.data = '';
    });
    builder.addCase(GetItemStatusReport.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;

        state.isLoading = 'succeeded';
      } else {
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(GetItemStatusReport.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = '';

      state.error = 'failed to store data';
    });
  },
});

export const get_item_status_report_data = (state: RootState) =>
  state.GetItemStatusReportScreen;

export default itemStatusReportScreen.reducer;
