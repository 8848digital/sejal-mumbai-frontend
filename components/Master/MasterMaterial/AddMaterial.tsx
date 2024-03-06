import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';
import React from 'react';

const AddMaterial = ({
  nameValue,
  HandleNameChange,
  HandleSave,
  error1,
  error2,
  error3,
  placeholder1,
  placeholder2,
  placeholder3,
  searchClient,
  setSearchClient,
  value,
  clientGroup,
  selectDropDownReset,
  setSelectDropDownReset,
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
          <label htmlFor="">{placeholder1}</label>
          <span className="text-danger">*</span>
        </div>
        <div className="p-1">
          <input
            type="text"
            className="form-control w-50 border p-0 px-2"
            name="material"
            value={nameValue.material}
            onChange={(e) => {
              HandleNameChange(e);
            }}
            required
          />
        </div>

        <div> {error1 && <p className="text-danger">{error1}</p>}</div>
        <div className=" m-1">
          <label htmlFor="">{placeholder2}</label>
          <span className="text-danger">*</span>
        </div>
        <div className="p-1">
          {value === 'client' ? (
            <SearchSelectInputField
              karigarData={clientGroup}
              className={'form-control w-50 border p-0 px-2'}
              placeholder={'Client Group'}
              selectedDropdownValue={searchClient}
              setSelectedDropdownValue={setSearchClient}
              style={'client-width'}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
            />
          ) : (
            <input
              type="text"
              className="form-control w-50 border p-0 px-2"
              name="material_abbr"
              value={nameValue.material_abbr}
              onChange={(e) => {
                HandleNameChange(e);
              }}
              required
            />
          )}
        </div>
        <div> {error2 && <p className="text-danger">{error2}</p>}</div>
        {value === 'material' && (
          <>
            <div className=" m-1">
              <label htmlFor="">{placeholder3}</label>
              <span className="text-danger">*</span>
            </div>
            <SearchSelectInputField
              karigarData={clientGroup}
              className={'form-control w-50 border p-0 px-2'}
              placeholder={'Material Group'}
              selectedDropdownValue={searchClient}
              setSelectedDropdownValue={setSearchClient}
              style={'client-width'}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
            />
            {/* <div> {error3 && <p className="text-danger">{error3}</p>}</div> */}
          </>
        )}
        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className=" btn btn-outline-primary py-1 mt-2 form-submit-button"
            onClick={HandleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaterial;
