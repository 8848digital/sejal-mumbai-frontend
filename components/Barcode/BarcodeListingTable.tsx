import { useState } from 'react';
import styles from '../../styles/readyReceiptTableListing.module.css';
import styled from '../../styles/barcode.module.css';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';

const BarcodeListingTable: any = ({
  BarcodeListData,
  multipleRecordsForPrint,
  handleCheckboxForBarcodePrint,
  handleBarcodePrint,
  handleMultipleBarcodePrint,
  setSearchItemCode,
  searchItemCode,
  selectAll,
  setSelectAll,
  handleSelectAll,
}: any) => {
  console.log(BarcodeListData, '@Barcode list');
  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);
  const [tableViewData, setTableViewData] = useState<any>(5);
  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-2 ">
        <div className="col-sm-2">
          {/* <label className="text-grey px-2">Item code</label> */}
          <div>
            <SearchSelectInputField
              karigarData={BarcodeListData?.map((data: any) => ({
                karigar_name: data.item_code,
              }))}
              placeholder={'Item code'}
              className={
                'form-control input-fields custom-input-field line-height p-1'
              }
              style={'max-width'}
              selectedDropdownValue={searchItemCode}
              setSelectedDropdownValue={setSearchItemCode}
              selectDropDownReset={kunKarigarDropdownReset}
              setSelectDropDownReset={setKunKarigarDropdownReset}
            />
          </div>
        </div>

        <div className="text-end d-flex align-items-end">
          <div className="mx-3">
            <button
              type="button"
              className="btn btn-outline-primary px-2 py-0 form-submit-button "
              onClick={() =>
                handleMultipleBarcodePrint(multipleRecordsForPrint)
              }
            >
              Print
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary px-2 py-0 form-submit-button mx-3"
            onClick={() => handleSelectAll(BarcodeListData, tableViewData)}
          >
            Select All
          </button>
        </div>
      </div>
      {BarcodeListData?.length > 0 && (
        <div className="text-end pe-3 p-0 text-gray small ">
          {BarcodeListData?.slice(0, tableViewData)?.length} of{' '}
          {BarcodeListData?.length < 4
            ? '0' + BarcodeListData?.length
            : BarcodeListData?.length}
        </div>
      )}

      <div className="row d-flex  ">
        <div
          className={`col-sm ${styled.custom_table_head}  p-0 border text-center`}
        >
          Sr.No.
        </div>
        <div
          className={`col-sm-2 ${styled.custom_table_head} border text-center`}
        >
          Item
        </div>
        <div className={`col-sm-7 ${styled.custom_table_head} border `}></div>
        <div
          className={`col-sm-1 ${styled.custom_table_head} border text-center`}
        >
          Print
        </div>
        <div className={`col-sm-1 ${styled.custom_table_head} border `}></div>
      </div>

      {BarcodeListData?.length > 0 &&
        BarcodeListData !== null &&
        BarcodeListData.slice(0, tableViewData).map(
          (item: any, index: number) => (
            <>
              <div className="row ">
                <div
                  className="col border text-center p-0"
                  style={{ width: '10px' }}
                >
                  {index + 1}
                </div>
                <div className="col-sm-2 border text-center">
                  {item?.item_code}
                </div>
                <div className="col-sm-7 border"></div>
                <div className="col-sm-1 border text-center">
                  <a
                    onClick={() =>
                      handleMultipleBarcodePrint([
                        { id: index, name: item.item_code },
                      ])
                    }
                    className={`button-section-text mx-auto text-info ${styles.cursor_pointer}`}
                  >
                    Print
                  </a>
                </div>
                <div className="col-sm-1 border text-center">
                  <input
                    className="mt-1 "
                    type="checkbox"
                    checked={multipleRecordsForPrint?.some(
                      (checkedItem: any) => checkedItem.id === item.idx
                    )}
                    onChange={() =>
                      handleCheckboxForBarcodePrint(item.idx, item.item_code)
                    }
                  />
                </div>
              </div>
            </>
          )
        )}
      {BarcodeListData?.length > 4 && BarcodeListData !== null && (
        <LoadMoreTableDataInMaster HandleTableViewRows={HandleTableViewRows} />
      )}

      {/* <table className="table table-hover table-bordered">
        <thead>
          <th className={`${styled.table_heading} thead`} scope="col">
            Sr. No
          </th>
          <th className="thead " scope="col">
            Item code
          </th>
          <th className="thead w-50" scope="col"></th>
          <th className="thead" scope="col">
            Print
          </th>
          <th className={` thead`} scope="col">

          </th>
        </thead>
        <tbody>
          {BarcodeListData?.length > 0 &&
            BarcodeListData !== null &&
            BarcodeListData.slice(0, tableViewData).map(
              (item: any, index: number) => (
                <tr key={index - 1} className="">
                  <td className="table_row  ">{index + 1}</td>
                  <td className="table_row ">{item?.item_code}</td>
                  <td className="table_row w-75"></td>
                  <td className="table_row ">
                    <a
                      onClick={() => handleBarcodePrint(item.item_code)}
                      className={`button-section-text mx-auto text-info ${styles.cursor_pointer}`}
                    >
                      print
                    </a>
                  </td>
                  <td className="table_row ">
                    <input
                      className="mt-1 "
                      type="checkbox"
                      checked={// selectAll ||
                        multipleRecordsForPrint?.some(
                          (checkedItem: any) => checkedItem.id === item.idx
                        )}
                      onChange={() =>
                        handleCheckboxForBarcodePrint(item.idx, item.item_code)
                      }
                    />
                  </td>
                </tr>
              )
            )}
          {BarcodeListData?.length > 4 && BarcodeListData !== null && (
            <LoadMoreTableDataInMaster
              HandleTableViewRows={HandleTableViewRows}
            />
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default BarcodeListingTable;
