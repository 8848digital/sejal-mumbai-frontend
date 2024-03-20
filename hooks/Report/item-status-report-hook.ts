import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import ReportApi from '@/services/api/report/get-report-data-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UseScrollbarHook from './report-table-scrollbar-hook';
import { get_item_status_report_data } from '@/store/slices/Report/item-status-report-slice';
import { toast } from 'react-toastify';
import ReportPrintApi from '@/services/api/report/report-print-api';

const useItemStatusReportHook = () => {
  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = UseScrollbarHook();

  // access token
  const loginAccessToken: any = useSelector(get_access_token);
  // filter states
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchVoucherNum, setSearchVoucherNum] = useState<string>('');
  const [searchName, setSearchName] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] = useState<string>('');
  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [searchInputValues, setSearchInputValues] = useState({
    from_date: todayDate,
    to_date: todayDate,
  });

  const [itemCodeSearchValues, setItemCodeSearchValues] = useState<any>({
    name: '',
    karigar: '',
  });

  // report data states
  const [itemStatusReportState, setItemStatusReportState] = useState<any>();
  const [reportData, setReportData] = useState<any>([]);
  const [itemList, setItemList] = useState<any>();

  // loader state
  const [isLoading, setIsLoading] = useState<number>(0);
  const [dailyStatusLoading, setDailyStatusLoading] = useState<number>(0);

  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();

  const HandleRefresh = () => {
    router.reload();
  };
  const itemStatusReportParams = {
    version: 'v1',
    method: 'get_item_status_report',
    entity: 'report',
    name: searchItem === undefined ? '' : searchItem,
    voucher_no: searchVoucherNum === undefined ? '' : searchVoucherNum,
    from_date:
      searchInputValues.from_date === undefined
        ? ''
        : searchInputValues.from_date,
    to_date:
      searchInputValues.to_date === undefined ? '' : searchInputValues.to_date,
  };
  const dailyQtyStatusReportParams = {
    version: 'v1',
    method: 'get_daily_qty_status_report',
    entity: 'report',
    name: searchName === undefined ? '' : searchName,
    from_date:
      searchInputValues.from_date === undefined
        ? ''
        : searchInputValues.from_date,
    to_date:
      searchInputValues.to_date === undefined ? '' : searchInputValues.to_date,
    voucher_no: '',
  };
  let itemCodeParams: any = {
    version: 'v1',
    method: 'product_code_report',
    entity: 'report',
  };
  useEffect(() => {
    const getStateData = async () => {
      let reportData;
      if (query?.reportId === 'daily-qty-status') {
        reportData = await ReportApi(
          loginAccessToken.token,
          dailyQtyStatusReportParams
        );
      } else if (query?.reportId === 'product-code') {
        reportData = await ReportApi(loginAccessToken.token, itemCodeParams);
      }

      if (reportData?.data?.message?.status === 'success') {
        setReportData(reportData?.data?.message?.data);
        if (reportData?.data?.message?.data?.length > 0) {
          setDailyStatusLoading(1);
        } else {
          setDailyStatusLoading(2);
        }
      }

      const itemListData = await getItemListInSalesApi(loginAccessToken.token);
      if (itemListData?.data?.data?.length > 0) {
        setItemList(itemListData?.data?.data);
      }
    };
    getStateData();
  }, [query]);

  const itemVoucherNumber: any =
    itemStatusReportState?.length > 0 &&
    itemStatusReportState !== null &&
    itemStatusReportState.map((data: any) => ({
      karigar_name: data.voucher_no,
    }));

  const dailyStatusSearchName: any =
    reportData?.length > 0 &&
    reportData !== null &&
    reportData.map((data: any) => ({
      karigar_name: data.name,
    }));

  const HandleReportPrint: any = async () => {
    const reqParams: any = {
      version: 'v1',
      method: 'print_report_daily_qty_status',
      entity: 'report',
      from_date: searchInputValues.from_date,
      to_date: searchInputValues.to_date,
    };

    let reportPrintApi: any = await ReportPrintApi(reqParams);

    if (reportPrintApi?.data?.message?.status === 'success') {
      window.open(reportPrintApi?.data?.message?.data?.print_url);
    } else if (reportPrintApi?.status === 'error') {
      toast.error(reportPrintApi?.message);
    }
  };
  const HandleSearchInput: any = (e: any) => {
    console.log('first', e.target.name);
    const { name, value } = e.target;
    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };
  const handleItemCodeSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setItemCodeSearchValues({
      ...itemCodeSearchValues,
      [name]: value,
    });
  };

  const handleSearchItemCodeReport: any = () => {};

  const HandleSerachReport = async () => {
    const dailyQtyReportData: any = await ReportApi(
      loginAccessToken.token,
      dailyQtyStatusReportParams
    );
    if (dailyQtyReportData?.data?.message?.status === 'success') {
      setReportData(dailyQtyReportData?.data?.message?.data);
      if (dailyQtyReportData?.data?.message?.data?.length > 0) {
        setDailyStatusLoading(1);
      } else setDailyStatusLoading(2);
    }
  };

  console.log('report data set', reportData);

  return {
    itemStatusReportState,
    itemVoucherNumber,
    setSearchItem,
    searchItem,
    selectDropDownReset,
    setSelectDropDownReset,
    searchVoucherNum,
    setSearchVoucherNum,
    dailyStatusSearchName,
    itemList,
    HandleSearchInput,
    searchInputValues,
    isLoading,
    HandleRefresh,
    dailyStatusLoading,
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    searchName,
    setSearchName,
    HandleReportPrint,
    HandleSerachReport,
    reportData,
    itemCodeSearchValues,
    setItemCodeSearchValues,
    handleItemCodeSearchInput,
    handleSearchItemCodeReport,
  };
};
export default useItemStatusReportHook;
