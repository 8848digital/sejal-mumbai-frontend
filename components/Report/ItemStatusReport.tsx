import { useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';
import ReportHeader from '../Header/ReportHeader';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';
import ReportFilterListing from './ReportFilterListing';
import Loader from '../NoRecord/Loader';
import NoRecord from '../NoRecord/NoRecord';
import { useRouter } from 'next/router';
import DailyStatusReportHeading from './DailyStatusReportHeading';

const ItemStatusReport: any = ({
  itemStatusReportState,
  reportName,
  voucherNumber,
  setSearchItem,
  searchItem,
  selectDropDownReset,
  setSelectDropDownReset,
  searchVoucherNum,
  setSearchVoucherNum,
  itemList,
  HandleSearchInput,
  searchInputValues,
  isLoading,
  HandleRefresh,
  scrollableTableRef,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleMouseMove,
  searchName,
  setSearchName,
  name,
  HandleReportPrint,
  HandleSerachReport,
}: any) => {
  const router = useRouter();
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    console.log('inside load more', data);
    setTableViewData(data);
  };
  console.log('@report daily qty status', itemStatusReportState);
  const filteredList =
    itemStatusReportState?.length > 0 &&
    itemStatusReportState !== null &&
    (searchInputValues.fromDate || searchInputValues.toDate)
      ? itemStatusReportState.filter((item: any) => {
          const postingDate = new Date(item?.posting_date);

          const dateMatch =
            (!searchInputValues.fromDate ||
              postingDate >= new Date(searchInputValues.fromDate)) &&
            (!searchInputValues.toDate ||
              postingDate <= new Date(searchInputValues.toDate));

          if (searchInputValues.status === 'Draft') {
            return item?.docstatus === 0 && dateMatch;
          } else if (searchInputValues.status === 'Submitted') {
            return item?.docstatus === 1 && dateMatch;
          } else if (searchInputValues.status === 'Cancel') {
            return item?.docstatus === 2 && dateMatch;
          }

          return dateMatch;
        })
      : itemStatusReportState;

  return (
    <div className="container-lg ">
      <ReportHeader />
      <div className="d-flex justify-content-between report-heading">
        <h5>{reportName}</h5>
        <button
          type="submit"
          className=" btn btn-outline-primary px-2 py-0 form-submit-button"
          onClick={HandleReportPrint}
        >
          Print
        </button>
      </div>

      <ReportFilterListing
        reportName={reportName}
        voucherNumber={voucherNumber}
        setSearchItem={setSearchItem}
        searchItem={searchItem}
        selectDropDownReset={selectDropDownReset}
        setSelectDropDownReset={setSelectDropDownReset}
        searchVoucherNum={searchVoucherNum}
        setSearchVoucherNum={setSearchVoucherNum}
        itemList={itemList}
        HandleSearchInput={HandleSearchInput}
        searchName={searchName}
        setSearchName={setSearchName}
        name={name}
        HandleSerachReport={HandleSerachReport}
      />

      {isLoading === 0 && <Loader />}
      {isLoading === 2 && (
        <NoRecord
          title={`No Record Found 😥`}
          heading=""
          HandleRefresh={HandleRefresh}
        />
      )}
      {isLoading === 1 && (
        <>
          {filteredList?.length > 0 && (
            <div className="text-end pe-3 p-0 text-gray small report-heading ">
              {filteredList?.slice(0, tableViewData)?.length - 3} of{' '}
              {filteredList?.length < 10
                ? '0' + (filteredList?.length - 3)
                : filteredList?.length - 3}
            </div>
          )}
          <div className="table-responsive ">
            <div
              ref={scrollableTableRef}
              className="scrollable-table-container"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <table className="table table-hover table-striped cursor report-width">
                {/* <thead>
                  <th className="thead" scope="col">
                    Sr.No.
                  </th>
                  {filteredList?.length > 0 &&
                    filteredList !== null &&
                    Object.keys(filteredList[0]).map((key) => (
                      <th className="thead" scope="col" key={key}>
                        {key.replace(/_/g, ' ')}
                      </th>
                    ))}
                </thead> */}
                <DailyStatusReportHeading />
                <tbody>
                  {filteredList?.length > 0 &&
                    filteredList !== null &&
                    filteredList
                      .slice(0, tableViewData)
                      .map((item: any, index: number) => (
                        <tr
                          key={index}
                          className={`row ${styles.table_row} ${
                            index >= filteredList.length - 2
                              ? 'last-two-rows'
                              : ''
                          }`}
                        >
                          <td
                            className={`col-sm-1 ${
                              index >= filteredList.length - 2 &&
                              reportName === 'Daily Quantity Status Report'
                                ? 'thead'
                                : 'table_row report-table-row '
                            }`}
                            scope="row"
                          >
                            {index >= filteredList.length - 2 &&
                            reportName === 'Daily Quantity Status Report'
                              ? ''
                              : index > 0
                              ? index
                              : ''}
                          </td>
                          {Object.values(item).map(
                            (value: any, innerIndex: number) => (
                              <td
                                key={innerIndex}
                                className={`${
                                  typeof value === 'string'
                                    ? 'col-sm-2'
                                    : 'col-sm-1'
                                } ${
                                  index >= filteredList.length - 2 &&
                                  reportName === 'Daily Quantity Status Report'
                                    ? 'thead'
                                    : 'table_row report-table-row '
                                }`}
                                scope="row"
                              >
                                {typeof value === 'number'
                                  ? value.toFixed(3)
                                  : value}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                  {filteredList?.length > 20 && filteredList !== null && (
                    <LoadMoreTableDataInMaster
                      HandleTableViewRows={HandleTableViewRows}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemStatusReport;
