import CurrentDate from '@/components/CurrentDate';
import React from 'react';

const StockTransferTopSection = ({
  handleSelectedLocation,
  warehouseList,
  sourceLocation,
  readOnlyFields,
  stockTransferData,
}: any) => {
  console.log('readOnlyFields', readOnlyFields);
  return (
    <div className="">
      <div className=" mt-2">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th className="thead " scope="col">
                Stock Transfer No.
              </th>
              <th className="thead" scope="col">
                Transaction Date
              </th>
              <th className="thead" scope="col">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table_row " scope="row">
                <input
                  className=" form-control input-sm border border-secondary light-background"
                  type="text"
                  name="remarks"
                  autoComplete="off"
                  //   value={query?.deliveryNoteId}
                  readOnly
                />
              </td>
              <td className="table_row">
                <CurrentDate
                //   defaultSalesDate={defaultSalesDate}
                />
              </td>

              <td className="table_row ">
                <select
                  className="form-select-sm w-100 input-sm border border-secondary rounded-3 py-0"
                  aria-label=".form-select-sm example"
                  onChange={handleSelectedLocation}
                  // defaultValue={stockTransferData?.custom_locations}
                  value={sourceLocation}
                  disabled={readOnlyFields}
                >
                  <option selected>Select Location</option>
                  {warehouseList?.length > 0 &&
                    warehouseList.map((warehouse: any) => (
                      <option value={warehouse.name}>{warehouse.name}</option>
                    ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTransferTopSection;
