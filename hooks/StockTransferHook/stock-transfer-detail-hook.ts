import { get_access_token } from '@/store/slices/auth/login-slice';
import {
  GetDetailOfStockTransfer,
  get_detail_stock_transfer_data,
} from '@/store/slices/stockTransfer/get-detail-of-stock-transfer-slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStockTransfer from './stock-transfer-hook';
import PutApi from '@/services/api/general/put-api';

const useStockTranferDetail: any = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const stockTransferDetailFromStore: any = useSelector(
    get_detail_stock_transfer_data
  );
  const loginAcessToken = useSelector(get_access_token);

  const {
    stockTransferData,
    setStockTransferData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    handleStockTransferCreate,
    handleNewStockTransfer,
    handleAddRowForStockTransfer,
    handleDeleteRow,
    stockTransferListingData,
    setStockTransferListingData,
    handleSelectedLocation,
    itemCodeListData,
    warehouseList,
    sourceLocation,
    setSourceLocation,
    stateForDocStatus,
    setStateForDocStatus,
    handleDeleteStockTransfer,
    handleUpdateDocStatus,
  } = useStockTransfer();

  console.log('stockTransferDetailFromStore', stockTransferDetailFromStore);
  useEffect(() => {
    if (query?.hasOwnProperty('stockId')) {
      const reqParams: any = {
        version: 'v1',
        method: 'name_specific_stock_entry',
        entity: 'stock_entry',
        token: loginAcessToken.token,
        name: query?.stockId,
      };
      dispatch(GetDetailOfStockTransfer(reqParams));
    }
  }, [query]);

  useEffect(() => {
    if (stockTransferDetailFromStore?.data?.length > 0) {
      setStockTransferData(stockTransferDetailFromStore?.data[0]?.items);
      setSourceLocation({
        name: stockTransferDetailFromStore?.data[0]?.custom_locations,
      });
    }
  }, [stockTransferDetailFromStore]);

  const handleUpdateStockTransfer: any = async () => {
    console.log('update stock transfer', stockTransferData);
    const reqBody: any = {
      version: 'v1',
      method: 'put_stock_entry',
      entity: 'stock_entry',
      name: query?.stockId,
      // posting_date: "2024-03-11",
      custom_locations: sourceLocation,
      stock_entry_type: 'Material Transfer',
      items: stockTransferData,
    };

    let updateStockTransfer: any = await PutApi(
      loginAcessToken?.token,
      reqBody
    );
    console.log('updateStock transfer', updateStockTransfer);
  };

  return {
    stockTransferData,
    setStockTransferData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    handleStockTransferCreate,
    handleNewStockTransfer,
    handleAddRowForStockTransfer,
    handleDeleteRow,
    stockTransferListingData,
    setStockTransferListingData,
    handleSelectedLocation,
    itemCodeListData,
    warehouseList,
    sourceLocation,
    setSourceLocation,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateStockTransfer,
    handleDeleteStockTransfer,
    handleUpdateDocStatus,
  };
};

export default useStockTranferDetail;
