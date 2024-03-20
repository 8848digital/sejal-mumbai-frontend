import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
import PurchaseReceiptFileUploadMaster from '../PurchaseReceiptFileUpload/PurchaseReceiptFileUploadMaster';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_specific_receipt_data } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import TotalReadOnlyRow from './TotalReadOnlyRow';

const KundanKarigarReadyReceiptMasterTable = ({
  handleFieldChange,
  tableData,
  handleDeleteRow,
  handleTabPress,
  setTableData,
  kundanKarigarData,
  handleModal,
  readOnlyFields,
  selectedDropdownValue,
  setSelectedDropdownValue,
  setStateForDocStatus,
  selectedKundanKarigarDropdownValue,
  setSelectedKundanKarigarDropdownValue,
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
  calculateEditTotal,
  handleClearFileUploadInput,
  handleCreate,
  keyValue,
  handleUpdateReceipt,
  lastInputRef,
  firstInputRef,
  setMatWt,
  specificDataFromStore,
}: any) => {
  // console.log('table data receipt', tableData);
  const { query } = useRouter();
  const [calculationRow, setCalculationRow] = useState({
    custom_net_wt: 0,
    custom_few_wt: 0,
    custom_mat_wt: 0,
    custom_gross_wt: 0,
    custom_pcs: 0,
    custom_other: 0,
    custom_total: 0,
  });

  const calculateGrossWt = (i: any) => {
    console.log(i, 'i');
    return (
      tableData[i]?.custom_net_wt +
      tableData[i]?.custom_few_wt +
      tableData[i]?.custom_mat_wt
    );
  };

  useEffect(() => {
    const calculateLiveCalculations = async () => {
      // Calculate live values based on tableData
      const liveCalculations = tableData?.reduce(
        (accumulator: any, row: any) => {
          accumulator.custom_net_wt += Number(row.custom_net_wt) || 0;
          accumulator.custom_few_wt += Number(row.custom_few_wt) || 0;
          accumulator.custom_mat_wt += Number(row.custom_mat_wt) || 0;
          accumulator.custom_gross_wt += Number(row.custom_gross_wt) || 0;
          accumulator.custom_pcs += Number(row.table[0].pcs) || 0;
          accumulator.custom_other += Number(row.custom_other) || 0;
          accumulator.custom_total += Number(row.custom_total) || 0;
          return accumulator;
        },
        {
          custom_net_wt: 0,
          custom_few_wt: 0,
          custom_mat_wt: 0,
          custom_gross_wt: 0,
          custom_pcs: 0,
          custom_other: 0,
          custom_total: 0,
        }
      );

      // Calculate total custom amount for custom_ot_amt

      const totalCustomOtAmount = tableData.reduce((total: any, item: any) => {
        const customTotal = parseFloat(item.custom_total) || 0;
        const customOther = parseFloat(item.custom_other) || 0;

        if (customTotal !== item.totalAmount) {
          return total + customTotal;
        } else {
          return total + customTotal + customOther;
        }
      }, 0);
      liveCalculations.custom_total = totalCustomOtAmount;

      // Update the calculation row state
      setCalculationRow(liveCalculations);
    };
    // Recalculate live calculations whenever tableData changes
    calculateLiveCalculations();
  }, [tableData, setTableData]);

  useEffect(() => {
    if (specificDataFromStore?.data[0]?.items?.length === tableData?.length) {
      lastInputRef?.current?.focus();
    } else {
      firstInputRef?.current?.focus();
    }
  }, [specificDataFromStore, firstInputRef, lastInputRef, tableData?.length]);

  return (
    <div className="table responsive">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Sr.no
            </th>
            <th className="thead" scope="col">
              Product Code<span className="text-danger">*</span>
            </th>
            {(query?.receipt === 'kundan' || query?.receipt === 'Kundan') && (
              <th className="thead" scope="col">
                Kun Karigar
              </th>
            )}
            <th className="thead" scope="col">
              Net Wt<span className="text-danger">*</span>
            </th>
            {(query?.receipt === 'kundan' || query?.receipt === 'Kundan') && (
              <th className="thead" scope="col">
                Few Wt
              </th>
            )}
            <th className="thead" scope="col">
              Mat Wt
            </th>
            <th className="thead" scope="col">
              Gross Wt
            </th>
            {query?.receipt === 'mangalsutra' ||
            query?.receipt === 'Mangalsutra' ? (
              <th className="thead" scope="col">
                BB Pcs
              </th>
            ) : (
              <th className="thead" scope="col">
                Kun Pcs
              </th>
            )}
            <th className="thead" scope="col">
              Other
            </th>
            <th className="thead" scope="col">
              Total
            </th>
            <th className="thead" scope="col">
              Add Photo
            </th>
            <th className="thead" scope="col"></th>
            <th className="thead" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tableData?.length > 0 &&
            tableData !== null &&
            tableData.map((item: any, i: any) => (
              <>
                <tr key={item.idx} className={`${styles.table_row}`}>
                  <td
                    className="table_row"
                    // ref={firstInputRef}
                  >
                    {item.idx}
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-center`}
                      type="text"
                      defaultValue={item?.product_code}
                      value={item.product_code}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'product_code',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  {(query?.receipt === 'kundan' ||
                    query?.receipt === 'Kundan') && (
                    <td className="table_row">
                      <SelectInputKunKarigar
                        kundanKarigarData={kundanKarigarData}
                        kunKarigarDropdownReset={kunKarigarDropdownReset}
                        setKunKarigarDropdownReset={setKunKarigarDropdownReset}
                        defaultValue={item.custom_kun_karigar}
                        tableData={tableData}
                        setTableData={setTableData}
                        // selectedKundanKarigarDropdownValue={
                        //   selectedKundanKarigarDropdownValue
                        // }
                        setSelectedKundanKarigarDropdownValue={
                          setSelectedKundanKarigarDropdownValue
                        }
                        item={item}
                        id={item.idx}
                        setStateForDocStatus={setStateForDocStatus}
                        readOnlyFields={readOnlyFields}
                        fieldName={'custom_kun_karigar'}
                      />
                    </td>
                  )}

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      value={parseFloat(item.custom_net_wt)}
                      defaultValue={
                        item.custom_net_wt && item?.custom_net_wt?.toFixed(3)
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_net_wt',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  {(query?.receipt === 'kundan' ||
                    query?.receipt === 'Kundan') && (
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} text-end`}
                        type="number"
                        min={0}
                        value={item.custom_few_wt}
                        defaultValue={
                          item.custom_few_wt && item.custom_few_wt?.toFixed(3)
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'tableRow',
                            'custom_few_wt',
                            e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                  )}
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      // value={
                      //   // Number(tableData[i]?.totalModalWeight) ||
                      //   item.custom_mat_wt
                      // }
                      value={item?.custom_mat_wt}
                      defaultValue={
                        item.custom_mat_wt && item.custom_mat_wt?.toFixed(3)
                      }
                      readOnly={readOnlyFields}
                      onChange={(e) => {
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_mat_wt',
                          e.target.value
                        );
                        setMatWt((prevState: any) => ({
                          ...prevState,
                          tableMatWt: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) => handleModal(e, item.idx, item)}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      // value={calculateGrossWt(i)?.toFixed(3)}
                      value={
                        item.custom_gross_wt && item.custom_gross_wt?.toFixed(3)
                      }
                    />
                  </td>
                  {query?.receipt === 'mangalsutra' ||
                  query?.receipt === 'Mangalsutra' ? (
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} text-end`}
                        type="number"
                        min={0}
                        // value={item.custom_pcs}
                        defaultValue={item?.table[0]?.pcs}
                        value={item?.table[0]?.pcs}
                        onChange={(e) => {
                          handleFieldChange(
                            item.idx,
                            'tableRow',
                            'custom_pcs',
                            e.target.value
                          );
                        }}
                        readOnly={readOnlyFields}
                      />
                    </td>
                  ) : (
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} text-end`}
                        type="number"
                        min={0}
                        // value={item.custom_pcs}
                        defaultValue={item?.table[0]?.pcs}
                        value={item?.table[0]?.pcs}
                        onChange={(e) => {
                          handleFieldChange(
                            item.idx,
                            'tableRow',
                            'custom_pcs',
                            e.target.value
                          );
                        }}
                        readOnly={readOnlyFields}
                      />
                    </td>
                  )}

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      value={Number(item.custom_other)}
                      defaultValue={Number(item.custom_other)}
                      onChange={(e) => {
                        calculateEditTotal(item.idx, e.target.value);
                      }}
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    {' '}
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      // defaultValue={tableData[i]?.custom_total}
                      value={parseFloat(
                        Number(tableData[i].totalAmount) >= 0
                          ? Number(tableData[i]?.custom_other) +
                              Number(tableData[i]?.totalAmount)
                          : tableData[i]?.custom_total !== '' &&
                            tableData[i]?.custom_total !== undefined
                          ? tableData[i]?.custom_total
                          : tableData[i]?.custom_other
                      )?.toFixed(2)}
                    />
                  </td>

                  <td className="table_row">
                    <PurchaseReceiptFileUploadMaster
                      handleFieldChange={handleFieldChange}
                      item={item}
                      readOnlyFields={readOnlyFields}
                      handleClearFileUploadInput={handleClearFileUploadInput}
                      keyValue={keyValue}
                      handleUpdateReceipt={handleUpdateReceipt}
                      handleCreate={handleCreate}
                    />
                  </td>
                  <td className="table_row d-flex justify-content-center">
                    <button
                      className="d-flex align-items-center delete-link p-1 border-0"
                      disabled={readOnlyFields}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td className="table_row">
                    <button
                      className="form-control d-flex justify-content-center align-items-center delete-link p-1 border-0"
                      onClick={() => handleDeleteRow(item.idx)}
                      onKeyDown={(e) => handleTabPress(e, item.idx)}
                      disabled={readOnlyFields}
                      ref={lastInputRef}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: 'red', fontSize: 15 }}
                      />
                    </button>
                  </td>
                </tr>
              </>
            ))}
          <TotalReadOnlyRow calculationRow={calculationRow} />
        </tbody>
      </table>
    </div>
  );
};

export default KundanKarigarReadyReceiptMasterTable;
