import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import DeleteApi from '@/services/api/general/delete-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { GetDetailOfSalesReturn } from '@/store/slices/Sales/get-detail-sales-return-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UseCustomSalesReturnHook = () => {
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const dispatch = useDispatch();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const [kunCsOtFixedAmt, setKunCsOtFixedAmt] = useState<any>({
    csFixedAmt: 0,
    kunFixedAmt: 0,
    otFixedAmt: 0,
  });
  const SalesTableInitialState: any = {
    idx: 1,
    // kun_wt_initial: '',
    // cs_wt_initial: '',
    // bb_wt_initial: '',
    // ot_wt_initial: '',
    item_code: '',
    custom_gross_wt: '',
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: '',
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: '',
    custom_ot_: '',
    custom_ot_amt: '',
    custom_other: '',
    custom_amount: 0,
    warehouse: '',
  };

  const [salesReturnTableData, setSalesReturnTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<any>('');
  const [selectedLocation, setSelectedLocation] = useState<any>('Mumbai');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);
  const [saleReturnDeliveryNoteListing, setSaleReturnDeliveryNoteListing] =
    useState<any>();

  const handleSalesReturnTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesReturnTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          // Update the field value
          return {
            ...item,
            [fieldName]: value,

            custom_net_wt:
              Number(item.custom_gross_wt) -
              (Number(item.custom_kun_wt) +
                Number(item.custom_cs_wt) +
                Number(item.custom_bb_wt) +
                Number(item.custom_other_wt)),
            custom_cs_amt:
              fieldName === 'custom_cs'
                ? value * Number(item.custom_cs_wt)
                : item.custom_cs_amt,
            custom_kun_amt:
              fieldName === 'custom_kun'
                ? item?.custom_kun === ''
                  ? 1 * value
                  : Number(item?.custom_kun_pc) * value
                : fieldName === 'custom_kun_pc'
                  ? item.custom_kun === ''
                    ? 1 * value
                    : Number(item.custom_kun) * value
                  : item.custom_kun_amt,
            custom_ot_amt:
              fieldName === 'custom_ot_amt'
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

  const handleAddRowForSalesReturn: any = () => {
    const newRow: any = {
      idx: salesReturnTableData?.length + 1,
      item_code: '',
      custom_gross_wt: '',
      custom_kun_wt: '',
      custom_cs_wt: '',
      custom_bb_wt: '',
      custom_other_wt: '',
      custom_net_wt: '',
      custom_cs: kunCsOtFixedAmt?.csFixedAmt,
      custom_cs_amt: '',
      custom_kun_pc: '',
      custom_kun: kunCsOtFixedAmt?.kunFixedAmt,
      custom_kun_amt: '',
      custom_ot_: kunCsOtFixedAmt?.otFixedAmt,
      custom_ot_amt: 0,
      custom_other: '',
      custom_amount: 0,
    };

    setSalesReturnTableData([...salesReturnTableData, newRow]);
    setStateForDocStatus(true);
  };
  const handleDeleteRowOfSalesReturnTable: any = (id: any) => {
    if (salesReturnTableData?.length > 1) {
      const updatedData = salesReturnTableData
        .filter((item: any) => item.idx !== id)
        .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesReturnTableData(updatedData);
      setStateForDocStatus(true);
    }
  };

  const handleEmptySaleReturnData = () => {
    setSelectedClient('');
    setSalesReturnTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
    setKunCsOtFixedAmt({
      csFixedAmt: 0,
      kunFixedAmt: 0,
      otFixedAmt: 0,
    });
  };

  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
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
        dispatch(GetDetailOfSalesReturn(reqParams));
      } else {
        const deliveryNoteListParams = {
          version: 'v1',
          method: 'get_listening_delivery_note_sales_return',
          entity: 'delivery_note_api',
        };
        let updatedData: any = await getDeliveryNoteListing(
          loginAcessToken.token,
          deliveryNoteListParams
        );

        if (updatedData?.data?.message?.status === 'success') {
          setSaleReturnDeliveryNoteListing(updatedData?.data?.message?.data);
        }
      }
    }
  };

  const handleDeleteSalesReturn: any = async (id: any) => {
    const version = 'v1';
    const method = 'delete_delivery_note_sales_return';
    const entity = 'sales_return';

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      id
    );

    if (Object?.keys(deleteApi?.data)?.length === 0) {
      toast.success('Sales Return note Deleted');
      const deliveryNoteListParams = {
        version: 'v1',
        method: 'get_listening_delivery_note_sales_return',
        entity: 'sales_return',
      };
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    } else {
      toast.error('Failed to delete Sales Return');
    }
  };

  const handleTabPressInSales = (event: any, id: any, keyValue: any) => {
    if (
      event.key === 'Tab' &&
      id === salesReturnTableData[salesReturnTableData.length - 1].idx
    ) {
      handleAddRowForSalesReturn();
    }
    setStateForDocStatus(true);
  };
  const HandleFixedAmt = (e: any) => {
    const { name, value } = e.target;
    setKunCsOtFixedAmt({ ...kunCsOtFixedAmt, [name]: value });

    setSalesReturnTableData((prevData: any) => {
      return prevData.map((item: any, i: number) => {
        return {
          ...item,
          custom_cs: Number(name === 'csFixedAmt' ? value : item?.custom_cs),
          custom_kun: Number(name === 'kunFixedAmt' ? value : item?.custom_kun),
          custom_ot_: Number(name === 'otFixedAmt' ? value : item?.custom_ot_),
          custom_kun_amt:
            Number(item.custom_kun_pc) *
            Number(name === 'kunFixedAmt' ? value : item?.custom_kun),
          custom_cs_amt:
            Number(item?.custom_cs_wt) *
            Number(name === 'csFixedAmt' ? value : item?.custom_cs),
          custom_ot_amt:
            Number(item.custom_other_wt) *
            Number(name === 'otFixedAmt' ? value : item?.custom_ot_),
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

  return {
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
  };
};

export default UseCustomSalesReturnHook;
