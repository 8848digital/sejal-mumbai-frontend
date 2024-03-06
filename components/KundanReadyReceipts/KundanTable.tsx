import React, { useEffect } from 'react';
import CurrentDate from '../CurrentDate';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';
import { useRouter } from 'next/router';

const KundanTable = ({
  handleRecipietChange,
  recieptData,
  karigarData,
  setRecipitData,
  selectedDropdownValue,
  setSelectedDropdownValue,
  readyReceiptType,
  setReadyReceiptType,
  defaultKarigarData,
  setStateForDocStatus,
  readOnlyFields,
  warehouseListData,
  selectedLocation,
  setSelectedLocation,
  setKunKarigarDropdownReset,
  kunKarigarDropdownReset,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router?.asPath?.split('/');
  const lastPartOfURL = pathParts[pathParts?.length - 1];

  useEffect(() => {
    if (defaultKarigarData === undefined) {
      setReadyReceiptType(
        lastPartOfURL?.charAt(0)?.toUpperCase() + lastPartOfURL?.slice(1)
      );
    }
  }, [router, setReadyReceiptType, defaultKarigarData, lastPartOfURL]);

  return (
    <div className="">
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Receipt no.
            </th>
            <th className="thead" scope="col">
              Date
            </th>
            <th className="thead" scope="col">
              Karigar <span className="text-danger">*</span>
            </th>
            <th className="thead" scope="col">
              Remarks
            </th>
            <th className="thead" scope="col">
              Ready Receipt Type
            </th>
            <th className="thead" scope="col">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                value={query?.receiptId}
                readOnly
                autoComplete="off"
              />
            </td>
            <td scope="row" className="table_row">
              <CurrentDate defaultKarigarData={defaultKarigarData} />
            </td>
            <td className="table_row">
              <SearchSelectInputField
                karigarData={karigarData}
                defaultValue={karigarData?.karigar_name}
                recipitData={recieptData}
                setRecipitData={setRecipitData}
                selectedDropdownValue={selectedDropdownValue}
                setSelectedDropdownValue={setSelectedDropdownValue}
                setStateForDocStatus={setStateForDocStatus}
                placeholder={'Karigar Name'}
                className={'form-control input-sm border border-secondary'}
                readOnlyFields={readOnlyFields}
                name="custom_karigar"
                setSelectDropDownReset={setKunKarigarDropdownReset}
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                value={recieptData?.remarks}
                onChange={handleRecipietChange}
                readOnly={readOnlyFields}
                autoComplete="off"
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                readOnly
                value={
                  readyReceiptType ||
                  (defaultKarigarData !== undefined &&
                    defaultKarigarData?.length > 0 &&
                    defaultKarigarData !== null
                    ? defaultKarigarData[0]?.custom_ready_receipt_type
                    : '')
                }
                disabled
              />
            </td>
            <td className="table_row">
              <SearchSelectInputField
                karigarData={
                  warehouseListData?.length > 0 &&
                  warehouseListData !== null &&
                  warehouseListData.map((data: any) => ({
                    karigar_name: data.custom_store_location,
                  }))
                }
                defaultValue={'Mumbai'}
                recipitData={recieptData}
                setRecipitData={setRecipitData}
                selectedDropdownValue={selectedLocation}
                setSelectedDropdownValue={setSelectedLocation}
                setStateForDocStatus={setStateForDocStatus}
                className={'form-control input-sm border border-secondary'}
                readOnlyFields={readOnlyFields}
                name="store_location"
                setSelectDropDownReset={setKunKarigarDropdownReset}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KundanTable;
