import { combineReducers } from '@reduxjs/toolkit';
import GetDetailOfSalesReturnReducer from '../store/slices/Sales/get-detail-sales-return-slice';
import GetDetailOfDeliveryNoteDataReducer from '../store/slices/Sales/getDetailOfDeliveryNoteApi';
import GetAccessTokenScreen from '../store/slices/auth/login-slice';
import GetSpecificReceiptDataReducer from './slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import GetItemStatusReportReducer from './slices/Report/item-status-report-slice';
const appReducer = combineReducers({
  GetAccessTokenScreen: GetAccessTokenScreen,
  GetSpecificReceiptDataScreen: GetSpecificReceiptDataReducer,
  GetDetailOfDeliveryNoteDataScreen: GetDetailOfDeliveryNoteDataReducer,
  GetDetailOfSalesReturnScreen: GetDetailOfSalesReturnReducer,
  GetItemStatusReportScreen: GetItemStatusReportReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
