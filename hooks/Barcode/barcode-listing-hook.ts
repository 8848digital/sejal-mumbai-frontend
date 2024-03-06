import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';
import PrintApi from '@/services/api/general/print-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useBarcodeListingHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [BarcodeListData, setBarcodeListData] = useState<any>();
  const [multipleRecordsForPrint, setMultipleRecordsForPrint] = useState<any>(
    []
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    const getStateData: any = async () => {
      const BarcodeData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      if (BarcodeData?.data?.message?.status === 'success') {
        setBarcodeListData(BarcodeData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);

  const handleBarcodePrint: any = async (item_code: any) => {
    console.log('handle multiple print', multipleRecordsForPrint);
    const reqParams: any = {
      version: 'v1',
      method: 'print_barcode',
      entity: 'barcode',
      name: item_code,
    };

    let barcodePrintApi: any = await PrintApi(reqParams);
    console.log('barcodeprint api res', barcodePrintApi);
    if (barcodePrintApi?.data?.message?.status === 'success') {
      window.open(barcodePrintApi?.data?.message?.data?.data[0]?.print_url);
    } else if (barcodePrintApi?.status === 'error') {
      toast.error(barcodePrintApi?.message);
    }
  };

  const handleMultipleBarcodePrint: any = async (multipleRecord: any) => {
    console.log(multipleRecord, 'aaaaaaaaaaa');
    const namesArray =
      multipleRecord?.length > 0 &&
      multipleRecord !== null &&
      multipleRecord.map((record: any) => record.name || record.item_code);
    console.log(namesArray, 'aaaaaaa');
    const reqParams: any = {
      version: 'v1',
      method: 'get_multiple_specific_print_barcode',
      entity: 'barcode',
      name: JSON.stringify(namesArray),
    };

    let barcodePrintApi: any = await PrintApi(reqParams);
    console.log('barcodeprint api res', barcodePrintApi);
    if (barcodePrintApi?.data?.message?.status === 'success') {
      window.open(barcodePrintApi?.data?.message?.print_url);
    } else if (barcodePrintApi?.status === 'error') {
      toast.error(barcodePrintApi?.message);
    }
  };

  console.log('updated multiple record', multipleRecordsForPrint);

  const handleCheckboxForBarcodePrint = (id: any, name: any) => {
    console.log('prev items check', id, name);

    setMultipleRecordsForPrint((prevItems: any) => {
      const index = prevItems.findIndex((item: any) => item.id === id);

      if (index !== -1) {
        // If checkbox is checked, remove it from the list
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      } else {
        // If checkbox is unchecked, add it to the list
        return [...prevItems, { id, name }];
      }
    });
  };

  const handleSelectAll = (ListData: any, tableViewData: number) => {
    setSelectAll((prevSelectAll: boolean) => {
      const allItems = ListData.slice(0, tableViewData).map((item: any) => ({
        id: item.idx,
        name: item.item_code,
      }));

      // Update the state to the opposite value
      setMultipleRecordsForPrint(prevSelectAll ? [] : allItems);

      return !prevSelectAll;
    });
  };

  console.log(BarcodeListData, '@Barcode list data');
  return {
    BarcodeListData,
    setBarcodeListData,
    handleCheckboxForBarcodePrint,
    multipleRecordsForPrint,
    handleBarcodePrint,
    handleMultipleBarcodePrint,
    selectAll,
    setSelectAll,
    handleSelectAll,
  };
};
export default useBarcodeListingHook;
