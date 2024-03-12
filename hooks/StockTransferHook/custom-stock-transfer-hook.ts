import DeleteApi from '@/services/api/general/delete-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import {
  GetDetailOfStockTransfer,
  get_detail_stock_transfer_data,
} from '@/store/slices/stockTransfer/get-detail-of-stock-transfer-slice';
import { GetStockTransferListing } from '@/store/slices/stockTransfer/get-stock-transfer-listing-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useCustomStockTransfer: any = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [readOnlyFields, setReadOnlyFields] = useState<boolean>(false);
  const [showSaveButtonForAmendFlow, setShowSaveButtonForAmendFlow] =
    useState<boolean>(false);

  const stockTransferDetailFromStore: any = useSelector(
    get_detail_stock_transfer_data
  );

  useEffect(() => {
    if (stockTransferDetailFromStore?.docStatus > 0) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [stockTransferDetailFromStore]);

  const handleDeleteStockTransfer: any = async (name: any) => {
    const version = 'v1';
    const method = 'delete_stock_entry';
    const entity = 'stock_entry';

    let id: any = name === undefined ? query?.stockId : name;

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      id
    );

    if (deleteApi?.data?.message?.status === 'success') {
      const reqParams: any = {
        token: loginAcessToken?.token,
        version: 'v1',
        method: 'get_stock_entry',
        entity: 'stock_entry',
      };
      dispatch(GetStockTransferListing(reqParams));
    } else {
      toast.error('Failed to Delete Stock Entry');
    }
  };

  const handleUpdateDocStatus: any = async (docStatus: any, name: any) => {
    let id: any = name === undefined ? query?.stockId : name;
    const params = `/api/resource/Stock Entry/${id}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );

    if (updateDocStatus?.hasOwnProperty('data')) {
      if (query?.stockId !== undefined) {
        const reqStockEntryDetailsParams: any = {
          version: 'v1',
          method: 'name_specific_stock_entry',
          entity: 'stock_entry',
          token: loginAcessToken.token,
          name: query?.stockId,
        };
        dispatch(GetDetailOfStockTransfer(reqStockEntryDetailsParams));
      } else {
        const reqStockListingParams: any = {
          token: loginAcessToken?.token,
          version: 'v1',
          method: 'get_stock_entry',
          entity: 'stock_entry',
        };
        dispatch(GetStockTransferListing(reqStockListingParams));
      }
      setStateForDocStatus(false);
    }
  };

  return {
    handleUpdateDocStatus,
    handleDeleteStockTransfer,
    stateForDocStatus,
    setStateForDocStatus,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
  };
};

export default useCustomStockTransfer;
