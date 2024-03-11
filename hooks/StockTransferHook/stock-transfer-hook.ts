import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import CreateStockTransferApi from '@/services/api/StockTransfer/create-stock-transfer-api';
import GetApi from '@/services/api/general/get-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import {
  GetStockTransferListing,
  get_listing_stock_transfer_data,
} from '@/store/slices/stockTransfer/get-stock-transfer-listing-slice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCustomStockTransfer from './custom-stock-transfer-hook';

const useStockTransfer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log('query', router);
  const [stockTransferListingData, setStockTransferListingData] = useState<any>(
    []
  );
  const [warehouseList, setWarehouseList] = useState<any>([]);
  const [sourceLocation, setSourceLocation] = useState<any>({
    id: '',
    name: '',
  });
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [itemCodeListData, setitemCodeListData] = useState<any>([]);
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState('');
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);
  const loginAcessToken = useSelector(get_access_token);
  const stockTransferListingDataFromStore = useSelector(
    get_listing_stock_transfer_data
  );
  console.log(
    'stockTransferListingFromStore',
    stockTransferListingDataFromStore
  );

  const { handleUpdateDocStatus, handleDeleteStockTransfer }: any =
    useCustomStockTransfer();
  const initialTableData: any = {
    idx: 1,
    source_warehouse: sourceLocation.name,
    target_warehouse: '',
    item_code: '',
    qty: 1,
    allow_zero_valuation_rate: 1,
  };
  const [stockTransferData, setStockTransferData] = useState([
    initialTableData,
  ]);

  const getStockTransferListingFun: any = async () => {
    const reqParams: any = {
      token: loginAcessToken?.token,
      version: 'v1',
      method: 'get_stock_entry',
      entity: 'stock_entry',
    };
    dispatch(GetStockTransferListing(reqParams));
  };

  const getItemCodesDataFun: any = async () => {
    let itemCodesData: any = await getItemListInSalesApi(
      loginAcessToken?.token
    );
    console.log('itemcode', itemCodesData);
    if (itemCodesData?.data?.hasOwnProperty('data')) {
      if (itemCodesData?.data?.data?.length > 0) {
        setitemCodeListData(itemCodesData?.data?.data);
      }
    }
  };

  const getWarehouseListApiFun: any = async () => {
    const reqParams: any = {
      version: 'v1',
      method: 'list_warehouse',
      entity: 'stock_entry',
    };
    let getWarehouseList: any = await GetApi(reqParams);
    if (getWarehouseList?.data?.message?.status === 'success') {
      setWarehouseList(getWarehouseList?.data?.message?.data);
    }
  };
  useEffect(() => {
    getStockTransferListingFun();
    getItemCodesDataFun();
    getWarehouseListApiFun();
  }, []);

  useEffect(() => {
    if (stockTransferListingDataFromStore?.data?.length > 0) {
      setStockTransferListingData(stockTransferListingDataFromStore?.data);
    } else {
      setStockTransferListingData([]);
    }
  }, [stockTransferListingDataFromStore]);

  const handleStockTransferCreate: any = async () => {
    console.log('stockTransferData', stockTransferData, sourceLocation.id);

    const reqBody: any = {
      version: 'v1',
      method: 'create_stock_entry',
      entity: 'stock_entry',
      custom_locations: sourceLocation.id,
      stock_entry_type: 'Material Transfer',

      items: stockTransferData,
    };

    let createStockTransfer = await CreateStockTransferApi(
      loginAcessToken?.token,
      reqBody
    );
    console.log('create stock transfer', createStockTransfer);
    if (createStockTransfer?.message?.data?.status === 'success') {
      router.push(
        `${router.pathname}/${createStockTransfer?.message?.data.client_id}`
      );
    }
    // router.push(`${query.saleId}/${postDeliveryNote?.data?.message?.name}`);
  };

  const handleNewStockTransfer: any = () => {};

  const handleSelectedLocation: any = (e: any) => {
    console.log('select location', stockTransferData);
    let value: any = e.target.value;

    let [id, name] = value.split('|');
    setSourceLocation({
      id: id,
      name: name,
    });
    setStockTransferData((prevData: any) =>
      prevData.map((row: any) => ({
        ...row,
        source_warehouse: id,
      }))
    );
    setStateForDocStatus(true);
  };

  const handleAddRowForStockTransfer: any = () => {
    let newRow: any = {
      idx: stockTransferData?.length + 1,
      source_warehouse: sourceLocation.id,
      target_warehouse: '',
      item_code: '',
      qty: 1,
      allow_zero_valuation_rate: 1,
    };
    setStockTransferData([...stockTransferData, newRow]);
    setStateForDocStatus(true);
  };

  const handleDeleteRow: any = (id: any) => {
    if (stockTransferData?.length > 1) {
      const updatedData = stockTransferData
        .filter((item: any) => item.idx !== id)
        .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setStockTransferData(updatedData);
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
    handleDeleteStockTransfer,
    handleUpdateDocStatus,
  };
};

export default useStockTransfer;
