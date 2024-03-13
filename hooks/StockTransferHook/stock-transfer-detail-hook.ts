import { get_access_token } from '@/store/slices/auth/login-slice';
import {
  GetDetailOfStockTransfer,
  get_detail_stock_transfer_data,
} from '@/store/slices/stockTransfer/get-detail-of-stock-transfer-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStockTransfer from './stock-transfer-hook';
import PutApi from '@/services/api/general/put-api';
import { toast } from 'react-toastify';
import PostApi from '@/services/api/general/post-api';

const useStockTranferDetail: any = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
  } = useStockTransfer();

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
    if (
      stockTransferDetailFromStore?.isLoading === 'pending' &&
      stockTransferDetailFromStore?.data?.length === 0
    ) {
      setIsLoading(true);
    } else if (stockTransferDetailFromStore?.isLoading === 'succeeded') {
      setIsLoading(false);
      setStockTransferData(stockTransferDetailFromStore?.data[0]?.items);
      setSourceLocation(
        stockTransferDetailFromStore?.data[0]?.custom_locations
      );
    } else if (stockTransferDetailFromStore?.isLoading === 'failed') {
      setIsLoading(false);
    } else {
      setIsLoading(false);
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
    if (updateStockTransfer?.data?.message?.status === 'success') {
      const reqParams: any = {
        version: 'v1',
        method: 'name_specific_stock_entry',
        entity: 'stock_entry',
        token: loginAcessToken.token,
        name: query?.stockId,
      };
      dispatch(GetDetailOfStockTransfer(reqParams));
      setStateForDocStatus(false);
    } else {
      toast.error('Failed to Update StockEntry');
    }
  };

  const handleAmendButtonForDuplicateRecord: any = async () => {
    const reqBody = {
      version: 'v1',
      method: 'create_amended_stock_entry',
      entity: 'stock_entry',
      amended_from: query?.stockId,
      name: query?.stockId,
      custom_locations: sourceLocation,
      stock_entry_type: 'Material Transfer',
      items: stockTransferData,
    };

    const token: any = loginAcessToken?.token;
    let amendRecord: any = await PostApi(token, reqBody);
    console.log('amend record api res', amendRecord);
    if (amendRecord?.message?.data?.status === 'success') {
      setStateForDocStatus(false);
      setShowSaveButtonForAmendFlow(false);

      const newURL = `/stock-transfer/${query?.stockId}/${amendRecord?.message?.data?.client_id}`;
      const asPath = `/stock-transfer/${amendRecord?.message?.data?.client_id}`;
      router.push(newURL, asPath);
    } else {
      toast.error('Failed to amend Stock Entry');
    }
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
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    handleAmendButtonForDuplicateRecord,
    isLoading,
  };
};

export default useStockTranferDetail;
