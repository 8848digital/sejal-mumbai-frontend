import { useEffect } from 'react';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { getSpecificReceipt } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/readyReceiptTableListing.module.css';
import FilterKundanReadyReceiptListing from './FilterKundanReadyReceiptListing';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';
import getPurchasreceiptListApi from '@/services/api/PurchaseReceipt/get-purchase-recipts-list-api';
import PrintApi from '@/services/api/general/print-api';
import { toast } from 'react-toastify';

const KundanListing = ({
  kundanListing,
  setKundanListing,
  HandleDeleteReceipt,
  karigarData,
  colPlaceholder1,
  colPlaceholder2,
  printApiEntity,
  printApiMethod,
  deleteApiVersion,
  deleteApiMethod,
  deleteApiEntity,
  purchasRecieptListParams,
  HandleUpdateDocStatus,
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
}: any) => {
  const router = useRouter();
  const pathParts = router.asPath.split('/');
  const lastPartOfURL = pathParts[pathParts.length - 1];
  const { query } = useRouter();
  const dispatch = useDispatch();
  const storedNumberOfRows = sessionStorage.getItem('numberOfRows');
  let pathName: any = window?.location?.pathname;

  const [tableViewData, setTableViewData] = useState<number>(
    storedNumberOfRows ? parseInt(storedNumberOfRows) : 5
  );

  const HandleTableViewRows: any = (rows: any) => {
    sessionStorage.setItem('numberOfRows', rows);
    setTableViewData(rows);
  };

  useEffect(() => {
    sessionStorage.removeItem('numberOfRows');
  }, [pathName]);

  let url: any = router?.query?.receipt || router?.query?.saleId;

  const loginAcessToken = useSelector(get_access_token);

  const [searchReceiptNumber, setSearchReceiptNumber] = useState<any>('');
  const [searchKarigar, setSearchKarigar] = useState<any>('');

  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [searchInputValues, setSearchInputValues] = useState({
    from_date: '',
    to_date: '',
    status: '',
  });

  const HandleSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };

  useEffect(() => {
    setSearchInputValues({
      from_date: '',
      to_date: '',
      status: '',
    });
    setSearchReceiptNumber('');
    setSearchKarigar('');
  }, [query.receipt, todayDate]);

  const formattedDate: any = (date: any) => {
    const updatedDate = date?.split('-')?.reverse()?.join('-');
    return updatedDate;
  };

  const filteredList =
    kundanListing?.length > 0 &&
    kundanListing !== null &&
    (searchInputValues.from_date ||
      searchInputValues.to_date ||
      searchKarigar ||
      searchReceiptNumber ||
      searchInputValues.status)
      ? kundanListing.filter((item: any) => {
          const postingDate = new Date(item?.posting_date);

          const dateMatch =
            (!searchInputValues.from_date ||
              postingDate >= new Date(searchInputValues.from_date)) &&
            (!searchInputValues.to_date ||
              postingDate <= new Date(searchInputValues.to_date));

          const karigarMatch = searchKarigar
            ? item?.custom_karigar
              ? item.custom_karigar
                  ?.toLowerCase()
                  ?.includes(searchKarigar?.toLowerCase())
              : item?.custom_client_name
                  ?.toLowerCase()
                  ?.includes(searchKarigar?.toLowerCase())
            : true;

          const receiptNumberMatch = searchReceiptNumber
            ? item?.name
                ?.toLowerCase()
                .includes(searchReceiptNumber.toString().toLowerCase())
            : true;

          if (searchInputValues.status === 'Draft') {
            return (
              item?.docstatus === 0 &&
              dateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          } else if (searchInputValues.status === 'Submitted') {
            return (
              item?.docstatus === 1 &&
              dateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          } else if (searchInputValues.status === 'Cancel') {
            return (
              item?.docstatus === 2 &&
              dateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          }

          return dateMatch && karigarMatch && receiptNumberMatch;
        })
      : kundanListing;

  const HandleCancelReceipt: any = async (name: any) => {
    console.log('name', name);
    let cancelReceipt: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      '2',
      name
    );
    if (cancelReceipt?.hasOwnProperty('data')) {
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };

      let updatedData: any = await getPurchasreceiptListApi(
        loginAcessToken,
        capitalizeFirstLetter(lastPartOfURL)
      );

      console.log('updated data', updatedData);

      setKundanListing(updatedData?.data?.message?.data);
      const params: any = {
        token: loginAcessToken?.token,
        name: query?.receiptId,
      };
      dispatch(getSpecificReceipt(params));
    } else {
      toast.error('Failed to cancel records');
    }
  };

  const HandlePrintApi: any = async (name: any) => {
    const reqParams = {
      token: loginAcessToken?.token,
      name: name,
      version: 'v1',
      method: printApiMethod,
      entity: printApiEntity,
    };
    let printApiRes: any = await PrintApi(reqParams);
    console.log(printApiRes, 'print api res');
    if (printApiRes?.data?.message?.status === 'success') {
      if (printApiRes?.data?.message?.data?.data?.length > 0) {
        window.open(printApiRes?.data?.message?.data?.data[0]?.print_url);
      }
    }
  };
  const deleteParams = {
    version: deleteApiVersion,
    method: deleteApiMethod,
    entity: deleteApiEntity,
  };

  return (
    <>
      <FilterKundanReadyReceiptListing
        HandleSearchInput={HandleSearchInput}
        receiptNoList={filteredList}
        setSearchReceiptNumber={setSearchReceiptNumber}
        searchReceiptNumber={searchReceiptNumber}
        searchKarigar={searchKarigar}
        setSearchKarigar={setSearchKarigar}
        searchInputValues={searchInputValues}
        karigarData={karigarData}
        colPlaceholder1={colPlaceholder1}
        colPlaceholder2={colPlaceholder2}
        kunKarigarDropdownReset={kunKarigarDropdownReset}
        setKunKarigarDropdownReset={setKunKarigarDropdownReset}
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
            <th className="thead col-lg-2 col-2">{colPlaceholder1}</th>
            <th className="thead col-lg-2 col-2">{colPlaceholder2}</th>
            <th className="thead col-lg-1 col"></th>
            <th className="thead col-lg-1 col-2">Status</th>
            <th className="thead col-lg-3 col-2"></th>
          </tr>
        </thead>
        <tbody className="w-100">
          {filteredList?.length > 0 &&
            filteredList !== null &&
            filteredList.slice(0, tableViewData).map((item: any, i: any) => (
              <tr
                key={i}
                className={` row d-flex h-25 px-lg-3 px-0 text-small`}
              >
                <td
                  className={`table_row p-0  col-lg-1 col-1 text-small`}
                  // style={{ width: '50px' }}
                >
                  {i + 1}
                </td>
                <td className={`table_row  col-lg-2 col-2 p-0 text-small`}>
                  {formattedDate(item.posting_date)}
                </td>
                <td className={`table_row col-lg-2 col-2 p-0 text-small`}>
                  <Link
                    href={`${url}/${item.name}`}
                    className="text-dark text-decoration-none"
                  >
                    {item.custom_number}
                  </Link>
                </td>
                <td className={` table_row col-lg-2 col-2 p-0 text-small`}>
                  {item.custom_karigar
                    ? item.custom_karigar
                    : item.custom_client_name}
                </td>
                <td className={` table_row col-lg-1 col p-0 text-small`}></td>
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
                      className={` button-section-td text-center col-lg-3 col-2 p-0 ${styles.receipt_listing_table_data}`}
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
                              HandleUpdateDocStatus('1', item.name)
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
                            onClick={() => HandlePrintApi(item.name)}
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
                                  HandleUpdateDocStatus('2', item.name)
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
                                // href=""
                                onClick={() => HandleDeleteReceipt(item.name)}
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
    </>
  );
};

export default KundanListing;
