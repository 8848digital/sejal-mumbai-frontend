import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import DeleteApi from '@/services/api/general/delete-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UseDeliveryNoteHook from './delivery-note-hook';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { GetDetailOfDeliveryNote } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import getWarehouseListApi from '@/services/api/PurchaseReceipt/get-warehouse-list';
import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';

const UseCustomerSaleHook = () => {
  const { deliveryNoteListing, setDeliveryNoteListing }: any =
    UseDeliveryNoteHook();
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const [kunCsOtCategoryListData, setKunCsOtCategoryListData] = useState<any>(
    []
  );
  const [BBCategoryListData, setBBCategoryListData] = useState<any>([]);
  const [clientNameListData, setClientNameListData] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedItemCode, setSelectedItemCode] = useState();
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });

  const [deliveryNoteData, setDeliveryNoteData] = useState({
    store_location: '',
  });
  const [warehouseListData, setWarehouseListData] = useState<any>();
  const [barcodeListData, setBarcodeListData] = useState<any>();
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Mumbai');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [clientGroupList, setClientGroupList] = useState();
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);
  const [kunCsOtFixedAmt, setKunCsOtFixedAmt] = useState({
    csFixedAmt: 0,
    kunFixedAmt: 0,
    otFixedAmt: 0,
  });
  const [barcodedata, setBarcodeData] = useState<number>(0);
  const [isBarcodeChecked, setIsBarcodeChecked] = useState<boolean>(false);

  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const kunCsOtCategoryApi: any = await getKunCsOtCategoryApi(
        loginAcessToken.token
      );
      const warehouseData = await getWarehouseListApi(loginAcessToken?.token);

      if (kunCsOtCategoryApi?.data?.message?.status === 'success') {
        setKunCsOtCategoryListData(kunCsOtCategoryApi?.data?.message?.data);
      }

      let BBCategoryApi: any = await getBBCategoryApi(loginAcessToken.token);
      if (BBCategoryApi?.data?.message?.status === 'success') {
        setBBCategoryListData(BBCategoryApi?.data?.message?.data);
      }

      let ClientNameApi: any = await getClientApi(loginAcessToken.token);
      if (ClientNameApi?.data?.message?.status === 'success') {
        setClientNameListData(ClientNameApi?.data?.message?.data);
      }
      let itemListApi: any = await getItemListInSalesApi(loginAcessToken.token);

      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }
      const clientGroupData: any = await getClientGroupApi(
        loginAcessToken.token
      );
      console.log(clientGroupData, 'client group data in hook');
      if (clientGroupData?.data?.message?.status === 'success') {
        setClientGroupList(clientGroupData?.data?.message?.data);
      }
      if (warehouseData?.data?.message?.status === 'success') {
        setWarehouseListData(warehouseData?.data?.message?.data);
      }
      const BarcodeData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      if (BarcodeData?.data?.message?.status === 'success') {
        setBarcodeListData(BarcodeData?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);
  useEffect(() => {
    setSelectedLocation('Mumbai');
  }, []);
  const SalesTableInitialState: any = {
    idx: 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
    item_code: '',
    custom_gross_wt: 0,
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: 0,
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: 0,
    custom_ot_: '',
    custom_ot_amt: 0,
    custom_other: '',
    custom_amount: 0,
    warehouse: '',
  };

  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);

  const handleSalesTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          return {
            ...item,
            [fieldName]: Number(value),
            custom_net_wt:
              Number(item?.custom_gross_wt) -
                (Number(item?.custom_kun_wt) +
                  Number(item?.custom_cs_wt) +
                  Number(item?.custom_bb_wt) +
                  Number(item?.custom_other_wt)) <
                0
                ? 0
                : Number(item?.custom_gross_wt) -
                (Number(item?.custom_kun_wt) +
                  Number(item?.custom_cs_wt) +
                  Number(item?.custom_bb_wt) +
                  Number(item?.custom_other_wt)),
            custom_cs_amt:
              fieldName === 'custom_cs'
                ? Number(item.custom_cs_wt) * value
                : item.custom_cs_amt,
            custom_kun_amt:
              fieldName === 'custom_kun'
                ? Number(item?.custom_kun_pc) * value
                : fieldName === 'custom_kun_pc'
                  ? Number(item.custom_kun) * value
                  : item.custom_kun_amt,
            custom_ot_amt:
              fieldName === 'custom_ot_'
                ? Number(item.custom_other_wt) * value
                : item.custom_ot_amt,

          };
        } else {
          return item;
        }
      });
    });
    setStateForDocStatus(true);
  };
  const itemCodeListFunc = () => {
    if (barcodedata === 1) {
      const namesArray =
        barcodeListData?.length > 0 &&
        barcodeListData !== null &&
        barcodeListData.map((item: any) => ({ karigar_name: item.item_code }));
      return namesArray;
    } else {
      return (
        itemList?.length > 0 &&
        itemList !== null &&
        itemList.map((data: any) => ({
          karigar_name: data.name,
        }))
      );
    }
  };
  const itemCodeList = itemCodeListFunc();
  const updateBarcodeSalesTableData = (data: any) => {
    if (selectedItemCodeForCustomerSale?.id) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData.map((item: any) => {
          if (item.idx === selectedItemCodeForCustomerSale.id) {
            return {
              ...item,
              item_code: data[0]?.item_code,
              custom_gross_wt: data[0]?.custom_gross_wt,
              custom_kun_wt: data[0]?.custom_kun_wt,
              custom_cs_wt: data[0]?.custom_cs_wt,
              custom_bb_wt: data[0]?.custom_bb_wt,
              custom_other_wt: data[0]?.custom_other_wt,
              custom_net_wt: data[0]?.custom_net_wt,
              custom_cs: data[0]?.custom_cs,
              custom_cs_amt: data[0]?.custom_cs_amt,
              custom_kun_pc: data[0]?.custom_kun_pc,
              custom_kun: data[0]?.custom_kun,
              custom_kun_amt: data[0]?.custom_kun_amt,
              custom_ot_: data[0]?.custom_ot_,
              custom_ot_amt: data[0]?.custom_ot_amt,
              custom_other: data[0]?.custom_other,
              custom_amount: data[0]?.custom_amount,
            };
          } else {
            return item;
          }
        });
      setSalesTableData(updatedData);
    }
  };

  const updateSalesTableData = (data: any) => {

    if (selectedItemCodeForCustomerSale?.id) {
      // Assuming data is a list with a single object
      const updatedTable = salesTableData?.map((tableData: any) => {
        if (tableData.idx === selectedItemCodeForCustomerSale.id) {
          return {
            ...tableData,
            custom_gross_wt: data[0]?.custom_gross_wt,
            custom_kun_wt: Number(
              selectedCategory.KunCategory !== '' &&
                selectedCategory?.KunCategory !== undefined
                ? (data[0]?.custom_kun_wt * selectedCategory.KunCategory.type) /
                100
                : data[0]?.custom_kun_wt
            ),
            custom_cs_wt: Number(
              selectedCategory.CsCategory !== '' &&
                selectedCategory?.CsCategory !== undefined
                ? (data[0]?.custom_cs_wt * selectedCategory.CsCategory.type) /
                100
                : data[0]?.custom_cs_wt
            ),
            custom_bb_wt: Number(
              selectedCategory.BBCategory !== '' &&
                selectedCategory?.BBCategory !== undefined
                ? data[0]?.custom_bb_wt - selectedCategory.BBCategory.type
                : data[0].custom_bb_wt
            ),
            custom_other_wt: Number(
              selectedCategory.OtCategory !== '' &&
                selectedCategory?.OtCategory !== undefined
                ? (data[0]?.custom_other_wt *
                  selectedCategory.OtCategory.type) /
                100
                : data[0]?.custom_other_wt
            ),

            custom_net_wt: (Number(data.custom_gross_wt) -
              Number(data.custom_kun_wt + data.custom_cs_wt + data.custom_bb_wt + data.custom_other_wt)),

            custom_kun_pc: Number(data[0]?.custom_kun_pcs),
            custom_pr_kun_wt: Number(data[0]?.custom_kun_wt),
            custom_pr_cs_wt: Number(data[0]?.custom_cs_wt),
            custom_pr_bb_wt: Number(data[0]?.custom_bb_wt),
            custom_pr_other_wt: Number(data[0]?.custom_other_wt),
            warehouse: data[0].custom_warehouse,
          };
        } else {
          return tableData;
        }
      });

      setSalesTableData(updatedTable);
    }
  };

  const itemDetailApiFun = () => {
    if (barcodedata === 1) {
      if (
        // selectedItemCodeForCustomerSale.item_code?.length > 0
        itemCodeList?.length > 0 !== null &&
        itemCodeList?.length > 0 &&
        itemCodeList?.some(
          (obj: any) =>
            obj.karigar_name ===
            `${selectedItemCodeForCustomerSale.item_code}`?.toUpperCase()
        )
      ) {
        const itemDetailsMethod = 'get_specific_barcode_detail';
        const itemDetailsEntity = 'barcode';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              // Call the function to update salesTableData
              updateBarcodeSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    } else {
      if (
        // selectedItemCodeForCustomerSale.item_code?.length > 0
        itemCodeList !== null &&
        itemCodeList?.length > 0 &&
        itemCodeList?.some(
          (obj: any) =>
            obj.karigar_name === selectedItemCodeForCustomerSale.item_code
        )
      ) {
        const itemDetailsMethod = 'get_item_specific_sales';
        const itemDetailsEntity = 'sales';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              // Call the function to update salesTableData
              updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };
        getItemCodeDetailsFun();
      }
    }
  };
  useEffect(() => {
    itemDetailApiFun();
  }, [selectedItemCodeForCustomerSale]);

  const handleAddRowForSales: any = () => {
    const newRow: any = {
      idx: salesTableData?.length + 1,
      custom_pr_bb_wt: '',
      custom_pr_cs_wt: '',
      custom_pr_kun_wt: '',
      custom_pr_other_wt: '',
      item_code: '',
      custom_gross_wt: 0,
      custom_kun_wt: '',
      custom_cs_wt: '',
      custom_bb_wt: '',
      custom_other_wt: '',
      custom_net_wt: '',
      custom_cs: Number(kunCsOtFixedAmt?.csFixedAmt),
      custom_cs_amt: 0,
      custom_kun_pc: '',
      custom_kun: Number(kunCsOtFixedAmt?.kunFixedAmt),
      custom_kun_amt: 0,
      custom_ot_: Number(kunCsOtFixedAmt?.otFixedAmt),
      custom_ot_amt: 0,
      custom_other: '',
      custom_amount: 0,
      warehouse: '',
    };

    setSalesTableData([...salesTableData, newRow]);
    setStateForDocStatus(true);
  };

  const handleDeleteRowOfSalesTable: any = (id: any) => {
    if (salesTableData?.length > 1) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesTableData(updatedData);
      setStateForDocStatus(true);
    }
  };
  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    const selectedArray =
      name === 'BBCategory' ? BBCategoryListData : kunCsOtCategoryListData;
    const selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);

    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));
    setStateForDocStatus(true);
  };

  useEffect(() => {
    if (barcodedata === 0) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData.map((data: any) => {
          const kunInitial = Number(data?.custom_pr_kun_wt) || 0;
          const csWtInitial = Number(data?.custom_pr_cs_wt) || 0;
          const bbWtInitial = Number(data?.custom_pr_bb_wt) || 0;
          const otWtInitial = Number(data?.custom_pr_other_wt) || 0;

          return {
            ...data,
            custom_gross_wt: data?.custom_gross_wt,
            custom_kun_wt: Number(
              selectedCategory.KunCategory !== '' &&
                selectedCategory?.KunCategory !== undefined
                ? (kunInitial * selectedCategory?.KunCategory?.type) / 100
                : kunInitial
            ),
            custom_cs_wt: Number(
              selectedCategory.CsCategory !== '' &&
                selectedCategory?.CsCategory !== undefined
                ? (csWtInitial * selectedCategory?.CsCategory?.type) / 100
                : csWtInitial
            ),
            custom_bb_wt: Number(
              selectedCategory?.BBCategory !== '' &&
                selectedCategory?.BBCategory !== undefined
                ? bbWtInitial === 0
                  ? 0
                  : bbWtInitial - selectedCategory?.BBCategory?.type
                : bbWtInitial
            ),
            custom_other_wt: Number(
              selectedCategory.OtCategory !== '' &&
                selectedCategory?.OtCategory !== undefined
                ? (otWtInitial * selectedCategory.OtCategory?.type) / 100
                : otWtInitial
            ),
            custom_cs_amt: Number(
              (selectedCategory.CsCategory !== ''
                ? (csWtInitial * selectedCategory?.CsCategory?.type) / 100
                : Number(data?.custom_cs_wt)) * data?.custom_cs
            ),
            custom_ot_amt: Number(
              (selectedCategory.OtCategory !== ''
                ? (otWtInitial * selectedCategory?.OtCategory?.type) / 100
                : Number(data?.custom_other_wt)) * data?.custom_ot_
            ),
            custom_net_wt:
              Number(data?.custom_gross_wt) -
              Number(data?.custom_kun_wt) +
              Number(data?.custom_cs_wt) +
              Number(data?.custom_bb_wt) +
              Number(data?.custom_other_wt),
            custom_amount: Number(
              (Number.isNaN(data.custom_cs_amt)
                ? 0
                : Number(data?.custom_cs_amt)) +
              Number(data?.custom_kun_amt) +
              (Number.isNaN(data.custom_ot_amt)
                ? 0
                : Number(data?.custom_ot_amt)) +
              Number(data?.custom_other)
            )?.toFixed(3),
          };
        });
      setSalesTableData(updatedData);
    }
  }, [selectedCategory, salesTableData?.length, kunCsOtFixedAmt]);


  const handleEmptyDeliveryNote = () => {
    setSeletedCategory({
      KunCategory: '',
      CsCategory: '',
      BBCategory: '',
      OtCategory: '',
    });
    setKunCsOtFixedAmt({
      csFixedAmt: 0,
      kunFixedAmt: 0,
      otFixedAmt: 0,
    });
    setSelectedClient('');
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };
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
  const handleDNCreate: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesTableData);
    const updatedData =
      filteredData.length > 0 &&
      filteredData !== null &&
      filteredData.map((data: any) => {
        const {
          custom_pr_bb_wt,
          custom_pr_cs_wt,
          custom_pr_kun_wt,
          custom_pr_other_wt,
          warehouse,
          ...updatedObject
        } = data;
        return {
          ...updatedObject,
          custom_net_wt:
            Number(data?.custom_gross_wt) -
            (Number(data?.custom_kun_wt) +
              Number(data?.custom_cs_wt) +
              Number(data?.custom_bb_wt) +
              Number(data?.custom_other_wt))
          //     ? 0
          //     : Number(data?.custom_gross_wt) -
          //       (Number(data?.custom_kun_wt) +
          //         Number(data?.custom_cs_wt) +
          //         Number(data?.custom_bb_wt) +
          //         Number(data?.custom_other_wt)),
          // custom_amount: Number(
          //   (Number.isNaN(data.custom_cs_amt)
          //     ? 0
          //     : Number(data?.custom_cs_amt)) +
          //     Number(data?.custom_kun_amt) +
          //     (Number.isNaN(data.custom_ot_amt)
          //       ? 0
          //       : Number(data?.custom_ot_amt)) +
          //     Number(data?.custom_other)
          // )?.toFixed(2),
          // custom_ot_amt: Number(data.custom_other_wt) * Number(data.custom_ot_),
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
      custom_is_barcode: barcodedata,
      version: 'v1',
      method: 'create_delivery_note',
      entity: 'sales',
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BBCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
      items: updatedData,
    };
    let reqField = values.custom_client_name;
    if (reqField === '') {
      toast.error('Client Name is Empty');
    } else {
      const postDeliveryNote: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      if (postDeliveryNote?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Successfully');
        router.push(`${query.saleId}/${postDeliveryNote?.data?.message?.name}`);
      }
      if (postDeliveryNote?.data?.message?.status === 'error') {
        toast.error(`${postDeliveryNote?.data?.message?.message}`);
      }
    }
  };
  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
  };

  const handleTabPressInSales = (event: any, id: any, keyValue: any) => {
    if (
      event.key === 'Tab' &&
      id === salesTableData[salesTableData.length - 1].idx
    ) {
      handleAddRowForSales();
    }
    setStateForDocStatus(true);
  };
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note',
    entity: 'sales',
  };
  const HandleDeleteDeliveryNote: any = async (name: any) => {
    const version = 'v1';
    const method = 'delete_delivery_note_api';
    const entity = 'sales';

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      name
    );

    if (Object?.keys(deleteApi?.data)?.length === 0) {
      toast.success('Sales note Deleted');
      let updatedData: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (updatedData?.data?.message?.status === 'success') {
        setDeliveryNoteListing(updatedData?.data?.message?.data);
      }
    } else {
      toast.error('Failed to delete sales note');
    }
  };

  const HandleUpdateDocStatus: any = async (docStatus?: any, name?: any) => {
    let id: any = name === undefined ? query?.deliveryNoteId : name;
    const params = `/api/resource/Delivery Note/${id}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );
    if (updateDocStatus?.data?.hasOwnProperty('data')) {
      if (name === undefined) {
        const reqParams: any = {
          token: loginAcessToken.token,
          name: query?.deliveryNoteId,
        };
        dispatch(GetDetailOfDeliveryNote(reqParams));
      } else {
        let updatedData: any = await getDeliveryNoteListing(
          loginAcessToken.token,
          deliveryNoteListParams
        );

        if (updatedData?.data?.message?.status === 'success') {
          setDeliveryNoteListing(updatedData?.data?.message?.data);
        }
      }
    }
  };

  const HandleFixedAmt = (e: any) => {
    const { name, value } = e.target;
    setKunCsOtFixedAmt({ ...kunCsOtFixedAmt, [name]: value });

    setSalesTableData((prevData: any) => {
      return prevData.map((item: any, i: number) => {
        return {
          ...item,
          custom_cs: Number(name === 'csFixedAmt' ? value : item?.custom_cs),
          custom_kun: Number(name === 'kunFixedAmt' ? value : item?.custom_kun),
          custom_ot_: Number(name === 'otFixedAmt' ? value : item?.custom_ot_),
          custom_amount: Number(
            Number(item[i]?.custom_cs_amt) +
            Number(item[i]?.custom_kun_amt) +
            Number(item[i]?.custom_ot_amt) +
            Number(item[i]?.custom_other)
          ),
        };
      });
    });
    setStateForDocStatus(true);
  };
  const handleBarcodeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (barcodedata === 0) {
      setBarcodeData(1);
    } else setBarcodeData(0);
    setStateForDocStatus(true);
    setIsBarcodeChecked(!isBarcodeChecked);
  };

  const handleTabPressItemDetails = () => {
    if (barcodedata === 1) {
      if (selectedItemCodeForCustomerSale.item_code?.length > 4) {
        const itemDetailsMethod = 'get_specific_barcode_detail';
        const itemDetailsEntity = 'barcode';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              // Call the function to update salesTableData
              updateBarcodeSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    } else {
      if (selectedItemCodeForCustomerSale.item_code?.length > 4) {
        const itemDetailsMethod = 'get_item_specific_sales';
        const itemDetailsEntity = 'sales';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );

            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              console.log(
                getItemCodeDetailsApi?.data.message.data,
                'selected sale client table'
              );
              // Call the function to update salesTableData
              updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    }
  };

  return {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesTableFieldChange,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    itemList,
    handleEmptyDeliveryNote,
    selectedClient,
    setSelectedClient,
    handleDNCreate,
    stateForDocStatus,
    setStateForDocStatus,
    clientGroupList,
    HandleDeleteDeliveryNote,
    handleSelectClientGroup,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    deliveryNoteListParams,
    deliveryNoteListing,
    selectedItemCode,
    setSelectedItemCode,
    HandleUpdateDocStatus,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    setDeliveryNoteData,
    deliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    barcodedata,
    setBarcodeData,
    handleBarcodeData,
    barcodeListData,
    isBarcodeChecked,
    setIsBarcodeChecked,
    handleTabPressItemDetails,
    itemCodeList,
  };
};

export default UseCustomerSaleHook;
