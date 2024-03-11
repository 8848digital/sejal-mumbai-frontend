import React, { useState } from 'react';
import StockTranferFilterSection from './StockTranferFilterSection';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/readyReceiptTableListing.module.css';
import LoadMoreTableDataInMaster from '@/components/Master/LoadMoreTableDataInMaster';

const StockTransferListing = ({
  stockTransferListingData,
  handleUpdateDocStatus,
}: any) => {
  const router = useRouter();

  let url: any = router?.pathname;

  const [searchInputValues, setSearchInputValues] = useState({
    from_date: '',
    to_date: '',
    status: '',
  });
  const [searchStockTransferNo, setSearchStockTransferNo] = useState<any>('');

  const HandleSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };

  const storedNumberOfRows = sessionStorage.getItem('numberOfRows');

  const [tableViewData, setTableViewData] = useState<number>(
    storedNumberOfRows ? parseInt(storedNumberOfRows) : 5
  );

  const HandleTableViewRows: any = (rows: any) => {
    sessionStorage.setItem('numberOfRows', rows);
    setTableViewData(rows);
  };

  const filteredList =
    stockTransferListingData?.length > 0 &&
    stockTransferListingData !== null &&
    (searchInputValues.from_date ||
      searchInputValues.to_date ||
      searchStockTransferNo ||
      searchInputValues.status)
      ? stockTransferListingData.filter((item: any) => {
          const postingDate = new Date(item?.posting_date);

          const dateMatch =
            (!searchInputValues.from_date ||
              postingDate >= new Date(searchInputValues.from_date)) &&
            (!searchInputValues.to_date ||
              postingDate <= new Date(searchInputValues.to_date));

          const karigarMatch = searchStockTransferNo
            ? item?.name
              ? item.name
                  ?.toLowerCase()
                  ?.includes(searchStockTransferNo?.toLowerCase())
              : item?.custom_client_name
                  ?.toLowerCase()
                  ?.includes(searchStockTransferNo?.toLowerCase())
            : true;

          if (searchInputValues.status === 'Draft') {
            return item?.docstatus === 0 && dateMatch && karigarMatch;
          } else if (searchInputValues.status === 'Submitted') {
            return item?.docstatus === 1 && dateMatch && karigarMatch;
          } else if (searchInputValues.status === 'Cancel') {
            return item?.docstatus === 2 && dateMatch && karigarMatch;
          }

          return dateMatch && karigarMatch;
        })
      : stockTransferListingData;

  const formattedDate: any = (date: any) => {
    const updatedDate = date?.split('-')?.reverse()?.join('-');
    return updatedDate;
  };

  return (
    <div>
      <StockTranferFilterSection
        HandleSearchInput={HandleSearchInput}
        StockTransferNumber={
          stockTransferListingData?.length > 0 &&
          stockTransferListingData.map((data: any) => data.name)
        }
        // setSearchReceiptNumber={setSearchReceiptNumber}
        // searchReceiptNumber={searchReceiptNumber}
        searchStockTransferNo={searchStockTransferNo}
        setSearchStockTransferNo={setSearchStockTransferNo}
        searchInputValues={searchInputValues}
        // karigarData={karigarData}
        kunKarigarDropdownReset={'false'}
        setKunKarigarDropdownReset={'false'}
      />

      <div className="text-end pe-3 p-0 text-gray small ">
        {filteredList?.slice(0, tableViewData)?.length} of{' '}
        {filteredList?.length < 4
          ? '0' + filteredList?.length
          : filteredList?.length}
      </div>
      <table className="table table-striped table-hover my-0 ">
        <thead>
          <tr className="row d-flex px-lg-3 px-0">
            <th className={`thead col-lg-1 col-1`}>Sr No.</th>
            <th className="thead col-lg-2 col-2">Transaction Date</th>
            <th className="thead col-lg-3 col-3">Transfer No</th>
            <th className="thead col-lg-2 col-2"></th>
            {/* <th className="thead col-lg-1 col"></th> */}
            <th className="thead col-lg-1 col-2">Status</th>
            <th className="thead col-lg-3 col-2"></th>
          </tr>
        </thead>
        <tbody className="w-100 ">
          {filteredList?.length > 0 &&
            filteredList !== null &&
            filteredList.slice(0, tableViewData).map((item: any, i: any) => (
              <tr
                key={i}
                className={` row d-flex h-25 px-lg-3 px-0 text-small py-auto`}
              >
                <td className={`table_row p-0  col-lg-1 col-1 text-small`}>
                  {i + 1}
                </td>
                <td className={`table_row  col-lg-2 col-2 p-0 text-small`}>
                  {formattedDate(item.posting_date)}
                </td>
                <td className={`table_row col-lg-3 col-3 p-0 text-small`}>
                  <Link
                    href={`${url}/${item.name}`}
                    className="text-dark text-decoration-none"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className={` table_row col-lg-2 col-2 p-0 text-small`}>
                  {item.custom_karigar
                    ? item.custom_karigar
                    : item.custom_client_name}
                </td>
                {/* <td className={` table_row col-lg-1 col p-0 text-small`}></td> */}
                <td
                  className={`table_row col-lg-1 col-2 p-0 text-center text-small`}
                >
                  {item.docstatus === 0 ? (
                    <span className="align-middle">Draft</span>
                  ) : item.docstatus === 1 ? (
                    <span className="align-middle">Submitted</span>
                  ) : item.docstatus === 2 ? (
                    <span>Cancelled</span>
                  ) : (
                    ''
                  )}
                </td>
                {item.docstatus === 0 && (
                  <>
                    <td
                      className={`button-section-td text-center col-lg-3 col-2 p-0 ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center">
                        <div className="col-lg-3 col-12">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info align-top "
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-lg-3 col-12">
                          <a
                            onClick={() =>
                              handleUpdateDocStatus('1', item.name)
                            }
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Submit
                          </a>
                        </div>
                        <div className="col-lg-3 col-12">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 1 && (
                  <>
                    <td
                      className={` button-section-td  text-center col-lg-3 col-2 p-0 ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center ">
                        <div className="col-lg-3 col-12">
                          <a
                            // onClick={() => HandlePrintApi(item.name)}
                            className={`button-section-text text-info ${styles.cursor_pointer}`}
                          >
                            Print
                          </a>
                        </div>
                        <div className="col-lg-3 col-12">
                          {item?.posting_date ===
                          new Date()?.toISOString()?.split('T')[0] ? (
                            <>
                              <a
                                onClick={() =>
                                  handleUpdateDocStatus('2', item.name)
                                }
                                className={`button-section-text text-danger ${styles.cursor_pointer}`}
                              >
                                Cancel
                              </a>
                            </>
                          ) : (
                            <div className=""></div>
                          )}
                        </div>
                        <div className="col-lg-3 col-12">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 2 && (
                  <>
                    <td
                      className={` button-section-td  text-center col-lg-3 col-2 p-0 ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center  ">
                        <div className="col-lg-3 col-12">
                          {item?.posting_date ===
                          new Date()?.toISOString()?.split('T')[0] ? (
                            <>
                              <Link
                                href={`${url}/${item.name}`}
                                className="button-section-text text-info "
                              >
                                Amend
                              </Link>
                            </>
                          ) : (
                            <div className=""></div>
                          )}
                        </div>

                        <div className="col-lg-3 col-12">
                          {item?.posting_date ===
                          new Date()?.toISOString()?.split('T')[0] ? (
                            <>
                              <a
                                // onClick={() => HandleDeleteReceipt(item.name)}
                                className={`button-section-text text-danger ${styles.cursor_pointer}`}
                              >
                                Delete
                              </a>
                            </>
                          ) : (
                            <div className=""></div>
                          )}
                        </div>
                        <div className="col-lg-3 col-12">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          {filteredList?.length > 4 && filteredList !== null && (
            <LoadMoreTableDataInMaster
              HandleTableViewRows={HandleTableViewRows}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTransferListing;
