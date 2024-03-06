import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '@/components/SearchSelectInputField/SelectInputKunKarigar';
import SalesTableHeader from './SalesTableHeader';
import TotalReadOnlyRowForSales from '../TotalReadOnlyRowForSales';
import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { useSelector } from 'react-redux';

const CustomerSalesTable = ({
  salesTableData,
  setSalesTableData,
  selectedItemCodeForCustomerSale,
  setSelectedItemCodeForCustomerSale,
  handleSalesTableFieldChange,
  handleAddRowForSales,
  handleDeleteRowOfSalesTable,
  setStateForDocStatus,
  readOnlyFields,
  itemList,
  itemCodeDropdownReset,
  setItemCodeDropdownReset,
  selectedItemCode,
  setSelectedItemCode,
  handleTabPressInSales,
  kunCsOtFixedAmt,
  HandleFixedAmt,
  showAddrowBtn,
  scrollableTableRef,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleMouseMove,
  showAdditionalInputForCalculation,
  barcodedata,
  barcodeListData,
  handleTabPressItemDetails,
  itemCodeList,
}: any) => {
  // console.log(salesTableData, 'sales table data ');
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  const initialStateOfCalculationRow: any = {
    custom_gross_wt: 0,
    custom_kun_wt: 0,
    custom_cs_wt: 0,
    custom_bb_wt: 0,
    custom_other_wt: 0,
    custom_cs: 0,
    custom_kun_pc: 0,
    custom_kun: 0,
    custom_kun_amt: 0,
    custom_ot_: 0,
    custom_other: 0,
    custom_amount: 0,
    custom_ot_amt: 0,
    custom_cs_amt: 0,
    custom_net_wt: 0,
  }

  const [calculationRow, setCalculationRow] = useState(
    initialStateOfCalculationRow
  );


  const calculateLiveCalculations = async () => {
    const liveCalculations = salesTableData.reduce(
      (accumulator: any, row: any) => {
        accumulator.custom_gross_wt += parseFloat(row.custom_gross_wt) || 0;
        accumulator.custom_kun_wt += parseFloat(row.custom_kun_wt) || 0;
        accumulator.custom_cs_wt += parseFloat(row.custom_cs_wt) || 0;
        accumulator.custom_bb_wt += parseFloat(row.custom_bb_wt) || 0;
        accumulator.custom_other_wt += parseFloat(row.custom_other_wt) || 0;
        accumulator.custom_net_wt += parseFloat(row.custom_net_wt) || 0;
        accumulator.custom_cs += parseFloat(row.custom_cs) || 0;
        accumulator.custom_kun_pc += parseFloat(row.custom_kun_pc) || 0;
        accumulator.custom_kun += parseFloat(row.custom_kun) || 0;
        accumulator.custom_kun_amt += parseFloat(row.custom_kun_amt) || 0;
        accumulator.custom_ot_ += parseFloat(row.custom_ot_) || 0;
        accumulator.custom_other += parseFloat(row.custom_other) || 0;
        return accumulator;
      },
      initialStateOfCalculationRow
    );

    // Calculate total custom amount
    const totalCustomAmount = salesTableData.reduce(
      (total: any, item: any) => {

        return (
          total +
          (parseFloat(item.custom_cs_amt) || 0) + // custom_cs_amt
          (parseFloat(item.custom_kun_amt) || 0) + // custom_kun_amt
          (parseFloat(item.custom_ot_amt) || 0) + // custom_ot_amt
          (parseFloat(item.custom_other) || 0)
        );
      },
      0
    );

    liveCalculations.custom_amount = totalCustomAmount;

    // Calculate total custom amount for custom_ot_amt
    const totalCustomOtAmount = salesTableData.reduce(
      (total: any, item: any) => {
        return (
          total +
          (parseFloat(item.custom_other_wt) || 0) *
          (parseFloat(item.custom_ot_) || 0)
        );
      },
      0
    );
    liveCalculations.custom_ot_amt = totalCustomOtAmount;

    // Calculate total custom amount for custom_cs_amt
    const totalCustomCsAmount = salesTableData.reduce(
      (total: any, item: any) => {
        return (
          total +
          (parseFloat(item.custom_cs) || 0) *
          (parseFloat(item.custom_cs_wt) || 0)
        );
      },
      0
    );
    liveCalculations.custom_cs_amt = totalCustomCsAmount;

    // Calculate total custom net weight for custom_net_wt
    const totalCustomNetWeight = salesTableData.reduce(
      (total: any, item: any) => {
        const customNetWt =
          parseFloat(item.custom_gross_wt) -
          (parseFloat(item.custom_kun_wt) +
            parseFloat(item.custom_cs_wt) +
            parseFloat(item.custom_bb_wt) +
            parseFloat(item.custom_other_wt));
        return total + Math.max(customNetWt, 0);
      },
      0
    );
    liveCalculations.custom_net_wt = totalCustomNetWeight;

    setCalculationRow(liveCalculations);
  };


  useEffect(() => {
    calculateLiveCalculations();
  }, [salesTableData])


  const calculateCustomNetWt: any = () => {
    return salesTableData.map((item: any, index: any) => {
      const netWt = Number(item.custom_gross_wt) - (
        Number(item.custom_kun_wt) +
        Number(item.custom_cs_wt) +
        Number(item.custom_bb_wt) +
        Number(item.custom_other_wt)
      );
      return netWt < 0 ? 0.000 : netWt.toFixed(3);
    });
  }

  return (
    <>
      {showAddrowBtn === true && (
        <div className="container d-flex justify-content-end px-1">
          <button
            className="btn btn-link p-0"
            onClick={() => {
              if (!readOnlyFields) {
                handleAddRowForSales();
              }
            }}
          >
            Add Row
          </button>
        </div>
      )}

      <div className="table responsive">
        <div
          ref={scrollableTableRef}
          className="scrollable-table-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <table className="table table-hover table-bordered cursor">
            <thead>
              {DetailOfDeliveryNoteFromStore?.docStatus >= 1 ? (
                ''
              ) : (
                <tr className={`${styles.table_row} border-0`}>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0">
                    <input
                      type="text"
                      name="csFixedAmt"
                      className={` ${styles.customer_sale_input_field} text-end `}
                      min={0}
                      value={kunCsOtFixedAmt?.csFixedAmt}
                      onChange={(e) => HandleFixedAmt(e)}
                    />
                  </td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0">
                    <input
                      type="text"
                      name="kunFixedAmt"
                      className={` ${styles.customer_sale_input_field} text-end `}
                      min={0}
                      value={kunCsOtFixedAmt?.kunFixedAmt}
                      onChange={(e) => HandleFixedAmt(e)}
                    />
                  </td>
                  <td className="table_row border-0"></td>
                  <td className="table_row border-0">
                    <input
                      type="text"
                      name="otFixedAmt"
                      className={` ${styles.customer_sale_input_field} text-end `}
                      min={0}
                      value={kunCsOtFixedAmt?.otFixedAmt}
                      onChange={(e) => HandleFixedAmt(e)}
                    />
                  </td>
                  <td className="table_row border-0"></td>
                </tr>
              )}
              <SalesTableHeader />
            </thead>
            <tbody>
              {salesTableData?.length > 0 &&
                salesTableData !== null &&
                salesTableData.map((item: any, i: any) => (
                  <>
                    <tr key={item.idx} className={`${styles.table_row}`}>
                      <td className="table_row">{item?.idx}</td>
                      <td className="table_row">
                        <SelectInputKunKarigar
                          kundanKarigarData={itemCodeList}
                          kunKarigarDropdownReset={itemCodeDropdownReset}
                          setKunKarigarDropdownReset={setItemCodeDropdownReset}
                          defaultValue={item?.item_code}
                          tableData={salesTableData}
                          setTableData={setSalesTableData}
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
                          setStateForDocStatus={setStateForDocStatus}
                          readOnlyFields={readOnlyFields}
                          selectedKundanKarigarDropdownValue={selectedItemCode}
                          setSelectedKundanKarigarDropdownValue={
                            setSelectedItemCodeForCustomerSale
                          }
                          handleTabPressItemDetails={handleTabPressItemDetails}
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            item?.custom_gross_wt !== '' &&
                            item?.custom_gross_wt
                          )?.toFixed(3)}
                          defaultValue={Number(
                            item?.custom_gross_wt !== '' &&
                            item?.custom_gross_wt
                          )?.toFixed(3)}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_gross_wt',
                              e.target.value
                            )
                          }
                          readOnly
                        // disabled
                        />
                      </td>

                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item?.custom_kun_wt)}
                          defaultValue={Number(item?.custom_kun_wt)}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_kun_wt',
                              e.target.value
                            )
                          }
                          readOnly={readOnlyFields}
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_cs_wt)}
                          defaultValue={Number(item.custom_cs_wt)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_cs_wt',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            item.custom_bb_wt < 0 ? 0 : item.custom_bb_wt
                          )}
                          defaultValue={Number(item.custom_bb_wt)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_bb_wt',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_other_wt)}
                          defaultValue={item.custom_other_wt}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_other_wt',
                              e.target.value
                            )
                          }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={calculateCustomNetWt()[i]}
                          defaultValue={Number(item.custom_net_wt)?.toFixed(3)}
                          readOnly
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_net_wt',
                              e.target.value
                            )
                          }
                        // disabled
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_cs)}
                          defaultValue={Number(item.custom_cs)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_cs',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            Number(item.custom_cs) * Number(item.custom_cs_wt)
                          )?.toFixed(2)}
                          defaultValue={Number(item.custom_cs_amt)}
                          readOnly
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_cs_amt',
                              e.target.value
                            )
                          }
                        // disabled
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={item.custom_kun_pc}
                          defaultValue={item.custom_kun_pc}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_kun_pc',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={item.custom_kun}
                          defaultValue={item.custom_kun}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_kun',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={(
                            Number(item.custom_kun_pc) * Number(item.custom_kun)
                          )?.toFixed(2)}
                          defaultValue={item.custom_kun_amt}
                          readOnly
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_kun_amt',
                              e.target.value
                            )
                          }
                        // disabled
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_ot_)}
                          defaultValue={Number(item.custom_ot_)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_ot_',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            Number(item.custom_other_wt) *
                            Number(item.custom_ot_)
                          )?.toFixed(2)}
                          defaultValue={Number(
                            Number(item.custom_other_wt) *
                            Number(item.custom_ot_)
                          )?.toFixed(2)}
                          readOnly
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_ot_amt',
                              e.target.value
                            )
                          }
                        // disabled
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_other)}
                          defaultValue={Number(item.custom_other)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_other',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            (Number.isNaN(item.custom_cs_amt)
                              ? 0
                              : Number(item?.custom_cs_amt)) +
                            Number(item?.custom_kun_amt) +
                            (Number.isNaN(item.custom_ot_amt)
                              ? 0
                              : Number(item?.custom_ot_amt)) +
                            Number(item?.custom_other)
                          )?.toFixed(2)}
                          defaultValue={Number(
                            Number(item?.custom_cs_amt) +
                            Number(item?.custom_kun_amt) +
                            Number(item?.custom_ot_amt) +
                            Number(item?.custom_other)
                          )}
                          readOnly
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_amount',
                              e.target.value
                            )
                          }
                        // disabled
                        />
                      </td>
                      <td className="table_row">
                        <button
                          className="d-flex align-items-center delete-link p-1 border-0"
                          onClick={() => {
                            if (!readOnlyFields) {
                              handleDeleteRowOfSalesTable(item.idx);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (!readOnlyFields) {
                              handleTabPressInSales(e, item.idx);
                            }
                          }}
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
              <TotalReadOnlyRowForSales calculationRow={calculationRow} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerSalesTable;
