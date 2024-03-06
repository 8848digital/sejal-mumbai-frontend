import React, { useEffect, useState } from 'react';
import UseCustomSalesReturnHook from './custom-sales-return-hook';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import getClientApi from '@/services/api/Master/get-client-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import getWarehouseListApi from '@/services/api/PurchaseReceipt/get-warehouse-list';

const UseSalesReturnMasterHook = () => {
  const router = useRouter();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const {
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
    stateForDocStatus,
    setStateForDocStatus,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    saleReturnDeliveryNoteListing,
    setSaleReturnDeliveryNoteListing,
    HandleUpdateDocStatus,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    selectedLocation,
    setSelectedLocation,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
  }: any = UseCustomSalesReturnHook();
  const [clientNameListData, setClientNameListData] = useState<any>([]);
  const [deliveryNoteData, setDeliveryNoteData] = useState({
    store_location: '',
  });
  const [itemList, setItemList] = useState<any>([]);
  const [warehouseListData, setWarehouseListData] = useState<any>();
  const [selectedItemCode, setSelectedItemCode] = useState<any>();

  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'sales_return',
  };

  useEffect(() => {
    const getDataFromapi: any = async () => {
      const itemListApi: any = await getItemListInSalesApi(
        loginAcessToken.token
      );

      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }

      const ClientNameApi: any = await getClientApi(loginAcessToken.token);
      if (ClientNameApi?.data?.message?.status === 'success') {
        setClientNameListData(ClientNameApi?.data?.message?.data);
      }
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
      const warehouseData = await getWarehouseListApi(loginAcessToken?.token);
      if (warehouseData?.data?.message?.status === 'success') {
        setWarehouseListData(warehouseData?.data?.message?.data);
      }
    };

    getDataFromapi();
  }, []);

  const updateSalesTableData = (data: any) => {
    setSelectedClient(data[0]?.custom_client_name);
    if (data?.length >= 0) {
      if (selectedItemCodeForCustomerSale?.id) {
        console.log(salesReturnTableData, 'table data in sale return');
        const updatedTable = salesReturnTableData?.map(
          (tableData: any, index: any) => {
            return tableData.idx === selectedItemCodeForCustomerSale.id
              ? { ...tableData, ...removeIdxKey(data[0]?.items[0]) }
              : tableData;
          }
        );
        setSalesReturnTableData(updatedTable);
      }
    } else {
      // Create a new row for each item in data[0]?.items
      const newRows = removeIdxKey(data[0]?.items)?.map(
        (item: any, index: any) => ({
          ...SalesTableInitialState,
          ...removeIdxKey(item),
          idx: index + 1, // Use a unique idx for each row
        })
      );

      setSalesReturnTableData((prevData: any) =>
        prevData
          ? [...prevData, ...newRows]
          : newRows || [SalesTableInitialState]
      );
    }
  };
  const removeIdxKey = (item: any) => {
    const { idx, ...itemWithoutIdx } = item;
    return itemWithoutIdx;
  };

  useEffect(() => {
    if (
      itemList?.length > 0 !== null && itemList?.length > 0 && itemList?.some(
        (obj: any) => obj.name === `${selectedItemCodeForCustomerSale.item_code}`?.toUpperCase()
      )
    ) {
      const getItemCodeDetailsFun = async () => {
        const getItemDetailsmethod: any =
          'get_delivery_note_specific_return_item';
        const getItemDetailsEntity: any = 'sales_return';
        try {
          let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
            loginAcessToken?.token,
            selectedItemCodeForCustomerSale.item_code,
            getItemDetailsmethod,
            getItemDetailsEntity
          );
          if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
            updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
          }
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      };

      getItemCodeDetailsFun();
    }
  }, [selectedItemCodeForCustomerSale]);
  const filteredTableDataForUpdate = (tableData: any) => {
    const filteredTableData = tableData.filter((row: any) => {
      // Check if there are no values except "idx"
      const hasNoValues = Object.keys(row).every(
        (key) => key === 'idx' || key === 'table' || row[key] === ''
      );

      // Exclude objects where item_code has no values and custom_gross_wt is equal to 0
      const shouldExclude = row.item_code === '';

      return !hasNoValues && !shouldExclude;
    });
    return filteredTableData;
  };
  const handleSRCreate: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesReturnTableData);
    const updatedData =
      filteredData?.length > 0 &&
      filteredData !== null &&
      filteredData.map((data: any) => {
        const { warehouse, ...updatedObject } = data;

        return {
          ...updatedObject,
          custom_kun_amt: Number(data.custom_kun_pc) * Number(data?.custom_kun),
          custom_cs_amt: Number(data?.custom_cs_wt) * Number(data?.custom_cs),
          custom_ot_amt: Number(data.custom_other_wt) * Number(data.custom_ot_),
          custom_amount: Number(
            Number(Number(data.custom_kun_pc) * Number(data?.custom_kun)) +
            Number(Number(data?.custom_cs_wt) * Number(data?.custom_cs)) +
            Number(Number(data.custom_other_wt) * Number(data.custom_ot_)) +
            Number(data?.custom_other)
          )?.toFixed(2),
        };
      });

    const values = {
      ...deliveryNoteData,
      custom_client_name: selectedClient,
      custom_client_group: selectedClientGroup,
      store_location:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
      is_return: '1',
      version: 'v1',
      method: 'create_delivery_note_sales_return',
      entity: 'sales_return',

      items: updatedData,
    };
    const clientVal = values?.custom_client_name;
    if (clientVal !== '') {
      const postSalesReturnApi: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      if (postSalesReturnApi?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Sucessfully');
        console.log('queryyy', query, router);
        router.push(
          `${query.saleId}/${postSalesReturnApi?.data?.message?.name}`
        );
      } else if (postSalesReturnApi?.data?.message?.status === "error") {
        toast.error(postSalesReturnApi?.data?.message?.message);
      }

    } else {
      toast.error('Client name is mandatory');
    }
  };

  return {
    itemList,
    clientNameListData,
    handleSRCreate,
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    selectedClient,
    setSelectedClient,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleSalesReturnTableFieldChange,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    handleSelectClientGroup,
    setItemCodeDropdownReset,
    HandleUpdateDocStatus,
    saleReturnDeliveryNoteListing,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    setStateForDocStatus,
    warehouseListData,
    setSelectedLocation,
    selectedLocation,
    deliveryNoteData,
    setDeliveryNoteData,
    SalesTableInitialState,
    stateForDocStatus,
    filteredTableDataForUpdate,
    selectedClientGroup,
    setSaleReturnDeliveryNoteListing,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    // handleTabPressItemDetails,
    selectedItemCode,
    setSelectedItemCode,
  };
};

export default UseSalesReturnMasterHook;
