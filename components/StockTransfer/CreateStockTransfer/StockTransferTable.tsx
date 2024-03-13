import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '@/components/SearchSelectInputField/SelectInputKunKarigar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from '../../../styles/stockTransfer.module.css';

const StockTransferTable = ({
  stockTransferData,
  setStockTransferData,
  handleAddRowForStockTransfer,
  selectedItemCodeForCustomerSale,
  setSelectedItemCodeForCustomerSale,
  itemCodeDropdownReset,
  setItemCodeDropdownReset,
  handleDeleteRow,
  itemCodeListData,
  warehouseList,
  sourceLocation,
  readOnlyFields,
}: any) => {
  // console.log(
  //   'stockTransferData',
  //   itemCodeListData,
  //   warehouseList,
  //   sourceLocation
  // );
  console.log('itemCodeListData', stockTransferData);
  const updatedList =
    itemCodeListData?.length > 0 &&
    itemCodeListData.map((data: any) => ({
      karigar_name: data.item_code,
    }));

  const targetWarehouseList =
    warehouseList?.length > 0 &&
    warehouseList
      .filter((data: any) => data.name !== sourceLocation)
      .map((data: any) => ({
        karigar_name: data.name,
      }));

  return (
    <>
      <div className="row">
        <div className="col-12 mx-auto">
          <div className="table responsive mt-5">
            <div className="container d-flex justify-content-end px-1">
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  if (!readOnlyFields) {
                    handleAddRowForStockTransfer();
                  }
                }}
              >
                Add Row
              </button>
            </div>
            <div className="scrollable-table-container">
              <table className="table table-hover table-bordered cursor">
                <thead>
                  <tr className={`${styles.table_row} border-0`}>
                    <td className="table_row border-0 thead">Sr No.</td>
                    <td className="table_row border-0 thead">
                      Source Warehouse
                    </td>
                    <td className="table_row border-0 thead">
                      Target Warehouse
                    </td>
                    <td className="table_row border-0 thead">Item code</td>
                    <td className="table_row border-0 thead"></td>
                  </tr>
                </thead>
                <tbody>
                  {stockTransferData?.length > 0 &&
                    stockTransferData !== null &&
                    stockTransferData.map((item: any, i: any) => (
                      <>
                        <tr key={item.idx} className={`${styles.table_row}`}>
                          <td className="table_row">{item?.idx}</td>
                          <td className="table_row">
                            <input
                              className={`text-center w-100 ${styled.stock_transfer_input}`}
                              type="text"
                              value={item?.source_warehouse}
                              defaultValue={item?.source_warehouse}
                              readOnly
                            />
                          </td>
                          <td className="table_row">
                            <SelectInputKunKarigar
                              kundanKarigarData={targetWarehouseList}
                              kunKarigarDropdownReset={itemCodeDropdownReset}
                              setKunKarigarDropdownReset={
                                setItemCodeDropdownReset
                              }
                              defaultValue={item?.target_warehouse}
                              tableData={stockTransferData}
                              setTableData={setStockTransferData}
                              selectedItemCodeForCustomerSale={
                                selectedItemCodeForCustomerSale
                              }
                              setSelectedItemCodeForCustomerSale={
                                setSelectedItemCodeForCustomerSale
                              }
                              placeholderValue="Target warehouse"
                              fieldName={'target_warehouse'}
                              item={item}
                              id={item?.idx}
                              // setStateForDocStatus={setStateForDocStatus}
                              readOnlyFields={readOnlyFields}
                              // selectedKundanKarigarDropdownValue={selectedItemCode}
                              setSelectedKundanKarigarDropdownValue={
                                setSelectedItemCodeForCustomerSale
                              }
                              width={styled.stock_transfer_drop}
                              // handleTabPressItemDetails={handleTabPressItemDetails}
                            />
                          </td>
                          <td className="table_row text-center">
                            <SelectInputKunKarigar
                              kundanKarigarData={updatedList}
                              kunKarigarDropdownReset={itemCodeDropdownReset}
                              setKunKarigarDropdownReset={
                                setItemCodeDropdownReset
                              }
                              defaultValue={item?.item_code}
                              tableData={stockTransferData}
                              setTableData={setStockTransferData}
                              selectedItemCodeForCustomerSale={
                                selectedItemCodeForCustomerSale
                              }
                              setSelectedItemCodeForCustomerSale={
                                setSelectedItemCodeForCustomerSale
                              }
                              placeholderValue="Item code"
                              fieldName={'item_code'}
                              item={item}
                              id={item?.idx}
                              width={styled.stock_transfer_drop}
                              // setStateForDocStatus={setStateForDocStatus}
                              readOnlyFields={readOnlyFields}
                              // selectedKundanKarigarDropdownValue={selectedItemCode}
                              setSelectedKundanKarigarDropdownValue={
                                setSelectedItemCodeForCustomerSale
                              }
                              // handleTabPressItemDetails={handleTabPressItemDetails}
                            />
                          </td>

                          <td className="table_row">
                            <button
                              className="d-flex align-items-center delete-link p-1 border-0"
                              onClick={() => {
                                if (!readOnlyFields) {
                                  handleDeleteRow(item.idx);
                                }
                              }}
                              // onKeyDown={(e) => {
                              //   if (!readOnlyFields) {
                              //     handleTabPressInSales(e, item.idx);
                              //   }
                              // }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: 'red', fontSize: 15 }}
                              />
                            </button>
                          </td>
                        </tr>
                        <tr></tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockTransferTable;
