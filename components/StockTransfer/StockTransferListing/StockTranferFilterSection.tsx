import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';
import React from 'react';

const StockTranferFilterSection = ({
  HandleSearchInput,
  searchInputValues,
  searchStockTransferNo,
  setSearchStockTransferNo,
  StockTransferNumber,
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
}: any) => {
  return (
    <div className="p-0 px-1 row">
      <div className="col-11 mx-auto">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="col-sm-2 p-0">
            <label className="text-grey">From Date</label>
            <div>
              <input
                type="date"
                name="from_date"
                value={searchInputValues?.from_date}
                className="form-control input-fields custom-input-field line-height  "
                onChange={HandleSearchInput}
              />
            </div>
          </div>
          <div className="col-sm-2 p-0 ">
            <label className="text-grey">To Date</label>
            <div>
              <input
                type="date"
                name="to_date"
                value={searchInputValues?.to_date}
                className="form-control input-fields custom-input-field line-height "
                onChange={HandleSearchInput}
              />
            </div>
          </div>
          <div className="col-sm-3 p-0">
            <label className="text-grey">Transfer No</label>
            <div>
              <SearchSelectInputField
                karigarData={
                  StockTransferNumber?.length > 0 &&
                  StockTransferNumber !== null &&
                  StockTransferNumber.map((item: any) => ({
                    karigar_name: item,
                  }))
                }
                placeholder={'Transfer No'}
                className={
                  'form-control input-fields custom-input-field line-height'
                }
                style={'max-width'}
                selectedDropdownValue={searchStockTransferNo}
                setSelectedDropdownValue={setSearchStockTransferNo}
                selectDropDownReset={kunKarigarDropdownReset}
                setSelectDropDownReset={setKunKarigarDropdownReset}
              />
            </div>
          </div>

          <div className=" col-sm-2 p-0">
            <label className="text-grey">Status</label>
            <div>
              <select
                name="status"
                id="status"
                className="form-select h-100 p-1 px-2 input-fields"
                aria-label="Default select example"
                value={searchInputValues?.status}
                onChange={HandleSearchInput}
              >
                <option>status</option>
                <option>Draft</option>
                <option>Submitted</option>
                <option>Cancel</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTranferFilterSection;
