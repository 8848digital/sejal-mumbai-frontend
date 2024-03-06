import { useRouter } from 'next/router';
import React from 'react';
import ItemStatusReport from './ItemStatusReport';
import useItemStatusReportHook from '@/hooks/Report/item-status-report-hook';
import ReportHeader from '../Header/ReportHeader';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent index');
  const key = pathcontent[pathcontent?.length - 1];
  const {
    itemStatusReportState,
    dailyQtyStatusReport,
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
  }: any = useItemStatusReportHook();
  return (
    <div className="">
      {/* {key === 'itemStatusReport' && (
        <ItemStatusReport
          itemStatusReportState={itemStatusReportState}
          reportName={'Item Status Report'}
          voucherNumber={itemVoucherNumber}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          searchVoucherNum={searchVoucherNum}
          setSearchVoucherNum={setSearchVoucherNum}
          itemList={itemList}
          setSearchItem={setSearchItem}
          searchItem={searchItem}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={isLoading}
          HandleRefresh={HandleRefresh}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
        />
      )} */}
      {key === 'dailyQtyStatus' && (
        <ItemStatusReport
          itemStatusReportState={dailyQtyStatusReport}
          reportName={'Daily Quantity Status Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
    </div>
  );
};

export default ReportIndexPage;
