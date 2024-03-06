import DeletePurchaseReceiptApi from '@/services/api/PurchaseReceipt/delete-purchase-receipt';
import getPurchasreceiptListApi from '@/services/api/PurchaseReceipt/get-purchase-recipts-list-api';
import postUploadFile from '@/services/api/PurchaseReceipt/post-upload-file-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import {
  getSpecificReceipt,
  get_specific_receipt_data,
} from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UseCustomReceiptHook: any = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router.asPath.split('/');
  const lastPartOfURL = pathParts[pathParts.length - 1];

  const loginAcessToken = useSelector(get_access_token);
  let specificDataFromStore: any = useSelector(get_specific_receipt_data);

  const [kundanListing, setKundanListing] = useState<any>([]);
  const [defaultKarigarData, setDefaultKarigarData] = useState<any>([]);
  const [indexVal, setIndexVal] = useState<any>();
  const [stateForDocStatus, setStateForDocStatus] = useState<any>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [matWt, setMatWt] = useState<any>({
    tableMatWt: '',
    bbPcs: '',
  });
  const [
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
  ] = useState('');
  const [showSaveButtonForAmendFlow, setShowSaveButtonForAmendFlow] =
    useState<any>(false);
  const [materialWeight, setMaterialWeight] = useState<any>([
    {
      idx: 1,
      material_abbr: '',
      material: '',
      pcs: '',
      piece_: '',
      carat: '',
      carat_: '',
      weight: '',
      gm_: '',
      amount: '',
    },
  ]);

  const initialTableState: any = {
    idx: 1,
    product_code: '',
    custom_kun_karigar: '',
    custom_net_wt: 0,
    custom_few_wt: 0,
    custom_gross_wt: 0,
    custom_pcs: 0,
    custom_mat_wt: 0,
    custom_other: 0,
    custom_total: '',
    custom_add_photo: '',
    totalModalWeight: 0,
    totalModalPcs: 0,
    totalAmount: 0,
    table: [
      {
        idx: materialWeight === undefined ? materialWeight?.length : 1,
        material_abbr: '',
        material: '',
        pcs: 0,
        piece_: '',
        carat: '',
        carat_: '',
        weight: 0,
        gm_: '',
        amount: '',
      },
    ],
  };

  const [tableData, setTableData] = useState<any>([initialTableState]);

  useEffect(() => {
    setTableData((prevTableData: any) => {
      const updatedTable: any = prevTableData?.map((tableItems: any) => ({
        ...tableItems,
        table: tableItems.table.map((tableItem: any) => ({
          ...tableItem,
          material_abbr: query?.receipt === 'kundan' ? 'Kun' : 'BB',
          material: query?.receipt === 'kundan' ? 'Kundan' : 'BlackBeads',
        })),
      }));
      return updatedTable;
    });
  }, [query]);
  const purchasRecieptListParams = {
    version: 'v1',
    method: 'get_specific_purchase_receipt',
    entity: 'specific_purchase_receipt',
  };

  const HandleDeleteReceipt: any = async (name: any) => {
    const params: any = {
      version: 'v1',
      method: 'delete_purchase_receipt',
      entity: 'purchase_receipt',
    };

    let deletePurchaseReceiptApi: any = await DeletePurchaseReceiptApi(
      loginAcessToken?.token,
      name,
      params
    );

    if (deletePurchaseReceiptApi?.message?.status === 'success') {
      toast.success(deletePurchaseReceiptApi?.message?.message);
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };

      let updatedData: any = await getPurchasreceiptListApi(
        loginAcessToken,
        capitalizeFirstLetter(lastPartOfURL)
      );
      if (updatedData?.data?.message?.status === 'success') {
        setKundanListing(updatedData?.data?.message?.data);
      }
    } else {
      toast.error('Failed to Delete purchase Receipt');
    }
  };

  const HandleUpdateDocStatus: any = async (docStatus?: any, name?: any) => {
    let id: any = name === undefined ? query?.receiptId : name;

    const params = `/api/resource/Purchase Receipt/${id}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );

    if (updateDocStatus?.data?.hasOwnProperty('data')) {
      if (name === undefined) {
        const params: any = {
          token: loginAcessToken?.token,
          name: query?.receiptId,
        };
        dispatch(getSpecificReceipt(params));
      } else {
        const capitalizeFirstLetter = (str: any) => {
          return str?.charAt(0)?.toUpperCase() + str?.slice(1);
        };

        let updatedData: any = await getPurchasreceiptListApi(
          loginAcessToken,
          capitalizeFirstLetter(lastPartOfURL)
        );
        if (updatedData?.data?.message?.status === 'success') {
          setKundanListing(updatedData?.data?.message?.data);
        }
      }
    }
  };

  const handleClearFileUploadInput: any = (id: any) => {
    setTableData((prevList: any) =>
      prevList.map((item: any) =>
        item.idx === id ? { ...item, custom_add_photo: '' } : item
      )
    );
    setStateForDocStatus(true);
  };

  const calculateEditTotal = (i: number, value: any) => {
    const updatedData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData.map((item: any) => {
        if (item.idx === i) {
          const totalvalues = item?.table.map((row: any) => row.amount);
          let numbers: any;
          if (Array.isArray(totalvalues) && totalvalues.length === 1) {
            numbers = totalvalues[0];
          } else {
            numbers = totalvalues.reduce((accu: any, val: any) => {
              return accu + val;
            }, 0);
          }
          let totalAmountValues = 0;

          if (Array.isArray(totalvalues)) {
            totalAmountValues = totalvalues.reduce((accu: any, val: any) => {
              return accu + val;
            }, 0);
          }
          if (Number(item.totalAmount) >= 0) {
            return {
              ...item,
              custom_other: Number(value),
              custom_total: Number(item.totalAmount) + Number(value),
            };
          } else if (item.totalAmount === undefined) {
            return {
              ...item,
              custom_other: Number(value),
              totalAmount: totalAmountValues,
              custom_total:
                totalAmountValues >= 0
                  ? totalAmountValues + Number(value)
                  : Number(value),
            };
          } else
            return {
              ...item,
              custom_other: value,
              totalAmount: totalAmountValues,
            };
        }
        return item;
      });
    setStateForDocStatus(true);
    setTableData(updatedData);
  };

  const handleFileUpload = async (id: number, fileVal: any) => {
    const bodyFormData: any = new FormData();

    if (fileVal instanceof File) {
      bodyFormData.append('file', fileVal);
    } else {
      bodyFormData.append('file', fileVal, 'capture.jpg');
    }

    const updatedData = await Promise.all(
      tableData?.map(async (row: any) => {
        if (row.idx === id) {
          const uploadedFile = await postUploadFile(
            loginAcessToken.token,
            bodyFormData
          );
          return {
            ...row,
            custom_add_photo: `/files/${uploadedFile?.file_name}`,
          };
        }
        return row;
      }) || []
    );

    setTableData(updatedData);
    setStateForDocStatus(true);
  };

  const handleDeleteRow = (id: any) => {
    if (tableData?.length > 1) {
      const updatedData =
        tableData?.length > 0 &&
        tableData !== null &&
        tableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));

      setTableData(updatedData);
    }
    setStateForDocStatus(true);
  };
  const handleDeleteChildTableRow = (id: any) => {
    if (materialWeight?.length > 1) {
      const updatedData = materialWeight?.filter(
        (item: any, i: any) => i !== id
      );
      setMaterialWeight(updatedData);
    }
    setStateForDocStatus(true);
  };

  const calculateRowValue = (i: any) => {
    return (
      materialWeight[i]?.pcs * materialWeight[i]?.piece_ +
      materialWeight[i]?.carat * materialWeight[i]?.carat_ +
      materialWeight[i]?.weight * materialWeight[i]?.gm_
    );
  };

  const handleModal = (event: any, id: any, data: any) => {
    setIndexVal(id);
    const dataVal =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.filter((item: any) => {
        if (item.idx === id && event.key === 'F2') {
          setShowModal(true);
          setMaterialWeight(item?.table);
        }
      });
  };

  const UpdateMaterialWeight: any = (id: any, weightAmt: any) => {
    const updatedTableData =
      tableData?.map((item: any) => {
        if (item.idx === id) {
          return {
            ...item,
            custom_mat_wt: weightAmt,
            custom_gross_wt:
              Number(item?.custom_net_wt) +
              Number(item?.custom_few_wt) +
              Number(weightAmt),
            table: item.table?.map((materialData: any) => ({
              ...materialData,
              weight: weightAmt,
            })),
          };
        }
        return item;
      }) || [];

    setTableData(updatedTableData);

    const updatedMaterialWeight =
      materialWeight?.map((item: any) => {
        if (item.idx === id) {
          return {
            ...item,
            weight: weightAmt,
          };
        }
        return item;
      }) || [];

    setMaterialWeight(updatedMaterialWeight);
  };
  const UpdatePcsWeight: any = (id: any, pcsAmt: any) => {
    const updatedTableData =
      tableData?.map((item: any) => {
        if (item.idx === id) {
          return {
            ...item,
            // custom_pcs: pcsAmt,
            table: item.table?.map((materialData: any) => ({
              ...materialData,
              pcs: pcsAmt,
            })),
          };
        }
        return item;
      }) || [];

    setTableData(updatedTableData);

    const updatedMaterialWeight =
      materialWeight?.map((item: any) => {
        if (item.idx === id) {
          return {
            ...item,
            pcs: pcsAmt,
          };
        }
        return item;
      }) || [];

    setMaterialWeight(updatedMaterialWeight);
  };
  const calculateGrossWt = (item: any, field: string, value: any) => {
    if (field === 'custom_few_wt') {
      item.custom_gross_wt =
        Number(item?.custom_net_wt) +
        Number(item.custom_mat_wt) +
        Number(value);
      console.log(item, '@PR item');
      return Number(value);
    }
    if (field === 'custom_mat_wt') {
      item.custom_gross_wt =
        Number(item?.custom_net_wt) +
        Number(item.custom_few_wt) +
        Number(value);
      return Number(value);
    }
    if (field === 'custom_net_wt') {
      item.custom_gross_wt =
        Number(item?.custom_few_wt) +
        Number(item.custom_mat_wt) +
        Number(value);
      return Number(value);
    }
  };

  const handleFieldChange = (
    id: number,
    val: any,
    field: string,
    newValue: any,
    fileVal?: any
  ) => {
    // console.log('handlechange', id, val, field, newValue, 'fileval', fileVal);
    // Function to format the input to have only three decimal places
    const formatInput = (value: any) => {
      if (typeof value === 'number' || !isNaN(parseFloat(value))) {
        const floatValue = parseFloat(value);
        return parseFloat(floatValue?.toFixed(3));
      }
      return value; // Return the original value for non-numeric inputs
    };

    const updatedData = tableData?.map((item: any) => {
      if (item.idx === id) {
        let filePath;
        if (fileVal instanceof File) {
          filePath = `/files/${fileVal.name}`;
        } else {
          filePath = '/files/capture.jpg';
        }
        let custom_gross_wt = 0;
        if (field === 'custom_few_wt') {
          custom_gross_wt =
            Number(item?.custom_net_wt) +
            Number(item.custom_mat_wt) +
            Number(newValue);
        }

        if (field === 'custom_net_wt') {
          custom_gross_wt =
            Number(item?.custom_few_wt) +
            Number(item.custom_mat_wt) +
            Number(newValue);
        }
        return {
          ...item,
          [field]:
            field === 'custom_add_photo'
              ? filePath
              : field === 'product_code'
              ? newValue.toUpperCase() // Convert to uppercase for 'product code'
              : formatInput(newValue),
          custom_gross_wt,
        };
      }
      return item;
    });

    setTableData(updatedData);
    if (field === 'custom_add_photo') {
      handleFileUpload(id, fileVal);
    }
    if (field === 'custom_mat_wt') {
      const numericValue =
        typeof newValue === 'string' ? parseFloat(newValue) : newValue;
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toFixed(3);
        UpdateMaterialWeight(id, formatInput(newValue));
      }
    }
    if (field === 'custom_pcs') {
      const numericValue =
        typeof newValue === 'string' ? parseFloat(newValue) : newValue;
      if (!isNaN(numericValue)) {
        UpdatePcsWeight(id, formatInput(newValue));
      }
    }

    setStateForDocStatus(true);
  };

  const handleAddRow = (value: any) => {
    console.log('value for add row', value);
    const newRow = {
      idx: tableData?.length + 1,
      product_code: '',
      custom_kun_karigar: '',
      custom_net_wt: 0,
      custom_few_wt: 0,
      custom_gross_wt: 0,
      custom_mat_wt: 0,
      custom_other: 0,
      custom_total: 0,
      custom_add_photo: '',
      table: [
        {
          // idx: materialWeight !== undefined ? materialWeight?.length : 1,
          idx: value === 'modalRow' ? materialWeight?.length + 1 : 1,
          material_abbr: '',
          material: '',
          pcs: 0,
          piece_: '',
          carat: '',
          carat_: '',
          weight: 0,
          gm_: '',
          amount: '',
        },
      ],
    };
    if (value === 'tableRow') {
      setTableData([
        ...tableData,
        {
          ...newRow,
          table: newRow.table.map((row) => ({
            ...row,
            material:
              query?.receipt === 'kundan' || query?.receipt === 'Kundan'
                ? 'Kundan'
                : 'BlackBeads',
            material_abbr:
              query?.receipt === 'kundan' || query?.receipt === 'Kundan'
                ? 'Kun'
                : 'BB',
          })),
        },
      ]);

      setMatWt({ tableMatWt: '', bbPcs: '' });
    } else {
      setMaterialWeight([...materialWeight, ...newRow.table]);
    }
    setStateForDocStatus(true);
  };

  return {
    setKundanListing,
    kundanListing,
    HandleDeleteReceipt,
    stateForDocStatus,
    setStateForDocStatus,
    HandleUpdateDocStatus,
    defaultKarigarData,
    setDefaultKarigarData,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    tableData,
    setTableData,
    materialWeight,
    setMaterialWeight,
    UpdateMaterialWeight,
    handleClearFileUploadInput,
    calculateEditTotal,
    handleFileUpload,
    handleDeleteRow,
    handleDeleteChildTableRow,
    calculateRowValue,
    handleModal,
    setShowModal,
    indexVal,
    showModal,
    handleFieldChange,
    purchasRecieptListParams,
    initialTableState,
    handleAddRow,
    matWt,
    setMatWt,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    specificDataFromStore,
  };
};

export default UseCustomReceiptHook;
