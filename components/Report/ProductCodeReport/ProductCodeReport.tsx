import React, { useState } from 'react';
import ReportHeader from '../../Header/ReportHeader';
import NoRecord from '../../NoRecord/NoRecord';
import Loader from '../../NoRecord/Loader';
import LoadMoreTableDataInMaster from '../../Master/LoadMoreTableDataInMaster';
import styles from '../../../styles/readyReceipts.module.css';
import styled from '../../../styles/report.module.css';
import ProductCodeReportFilter from './ProductCodeReportFilter';

const ProductCodeReport = ({
  isLoading,
  HandleRefresh,
  reportData,
  HandleItemCodeSearchInput,
  HandleSearchItemCodeReport,
  itemCodeSearchValues,
}: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    if (data !== 5) {
      setTableViewData(data);
    }
  };

  const filteredList =
    reportData?.length > 0 &&
    reportData !== null &&
    (itemCodeSearchValues.name || itemCodeSearchValues.karigar)
      ? reportData.filter((item: any) => {
          const itemCodeMatch = itemCodeSearchValues
            ? item?.name
                ?.toLowerCase()
                .includes(itemCodeSearchValues?.name?.toLowerCase())
            : true;
          const karigatMatch = itemCodeSearchValues
            ? item?.custom_kun_karigar
                ?.toLowerCase()
                .includes(itemCodeSearchValues?.karigar?.toLowerCase())
            : true;

          return itemCodeMatch && karigatMatch;
        })
      : reportData;

  return (
    <div className="container-lg">
      <ReportHeader />
      <ProductCodeReportFilter
        HandleSearchInput={HandleItemCodeSearchInput}
        HandleSearchReport={HandleSearchItemCodeReport}
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
          <div className="text-end pe-3 p-0 text-gray small report-heading ">
            {filteredList?.length > 0 && (
              <>
                {filteredList?.slice(0, tableViewData)?.length} of{' '}
                {filteredList?.length < 10
                  ? '0' + filteredList?.length
                  : filteredList?.length}
              </>
            )}
          </div>
          <div className="row justify-content-center">
            <div
              className={`col table-responsie m-auto ${styled.table_container}`}
            >
              <table className="table table-hover table-striped cursor ">
                <thead className="sticky-top">
                  <tr className="row justify-content-center ">
                    <th scope="col" className="thead col-sm-1 ">
                      Sr.No.
                    </th>
                    <th scope="col" className="thead col-sm-2 ">
                      Product Code
                    </th>
                    <th scope="col" className="thead col-sm-2 ">
                      Gross Wt
                    </th>
                    <th scope="col" className="thead col-sm-2 ">
                      Net Wt
                    </th>
                    <th scope="col" className="thead col-sm-2 ">
                      Karigar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList?.length > 0 &&
                    filteredList
                      .slice(0, tableViewData)
                      .map((data: any, index: any) => {
                        return (
                          <tr
                            key={index}
                            className={`row justify-content-center text-center ${styles.table_row} `}
                          >
                            <td className="col-sm-1 table_row py-1 py-auto">
                              {index + 1}
                            </td>
                            <td className="col-sm-2 table_row py-1 py-auto">
                              {data.name}
                            </td>
                            <td className="col-sm-2 table_row py-1 py-auto">
                              {data.custom_gross_wt}
                            </td>
                            <td className="col-sm-2 table_row py-1 py-auto">
                              {data.custom_net_wt}
                            </td>
                            <td className="col-sm-2 table_row py-1 py-auto">
                              {data.custom_karigar}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-9 px-0 mx-auto">
              {filteredList?.length > 20 && filteredList !== null && (
                <LoadMoreTableDataInMaster
                  HandleTableViewRows={HandleTableViewRows}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCodeReport;
