import React from 'react';

const ProductCodeReportFilter = ({
  HandleSearchInput,
  HandleSearchReport,
}: any) => {
  return (
    <div className="d-flex justify-content-center ">
      <div className="col-sm-2 p-0 mx-1">
        <label className="text-grey">Item Code</label>
        <div>
          <input
            type="text"
            name="name"
            className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10 "
            onChange={HandleSearchInput}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="col-sm-2 p-0 mx-1">
        <label className="text-grey">Karigar</label>
        <div>
          <input
            type="text"
            name="karigar"
            className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10"
            onChange={HandleSearchInput}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="col-sm-2 p-0 mx-1">
        <div>
          <label className="text-grey">Location</label>
        </div>
        <select
          className="form-select py-1 input-fields custom-input-field bg-primary bg-opacity-10"
          aria-label="Default select example"
          name="custom_warehouse"
          id="custom_warehouse"
          onChange={HandleSearchInput}
        >
          <option value="" selected>
            Select Location
          </option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {/* <div className="mt-4 mb-1 ms-2 d-flex justify-content-start">
        <button
          className="btn btn-primary m-0 p-1 px-2"
          onClick={HandleSearchReport}
        >
          <i className="fa-solid fa-magnifying-glass pe-2"></i>
          Search
        </button>
      </div> */}
    </div>
  );
};

export default ProductCodeReportFilter;
