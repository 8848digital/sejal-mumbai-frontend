import React from 'react';

const AddKarigar = ({
  inputValue,
  HandleInputValue,
  error,
  HandleSubmit,
  placeholder,
}: any) => {
  return (
    <div
      className="tab-pane fade w-75"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="container">
        <div className=" m-1">
          <label>{placeholder}</label>
          <span className="text-danger">*</span>
        </div>
        <div className="p-1">
          <input
            type="text"
            className="form-control w-50 border p-1 h-50"
            value={inputValue}
            onChange={(e) => {
              HandleInputValue(e);
            }}
            required
          />
        </div>
        <div>{error && <p className="text-danger">{error}</p>}</div>
        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className=" btn btn-outline-primary p-0 px-1  mt-2 form-submit-button"
            onClick={HandleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddKarigar;
