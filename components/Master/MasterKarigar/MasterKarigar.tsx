import React, { useState } from 'react';
import MasterKarigarListing from './MasterKarigarListing';
import AddKarigar from './AddKarigar';
import MasterListing from '../MasterListing';
import TabSection from '@/components/TabSection';

const MasterKarigar: any = ({
  karigarData,
  inputValue,
  HandleInputValue,
  HandleSubmit,
  error,
  value,
  placeholder,
  tab1,
  tab2,
}: any) => {
  const [searchField, setSearchField] = useState<any>('');
  const HandleSearchInput: any = (e: any) => {
    setSearchField(e.target.value);
  };
  const filterList: any =
    karigarData?.length > 0 &&
    karigarData !== null &&
    karigarData?.filter((value: any) => {
      return value.karigar_name
        ?.toLowerCase()
        .includes(searchField?.toLowerCase());
    });
  console.log(karigarData, 'kun karigar master');
  return (
    <div className="container-lg">
      <MasterListing value={value} />
      <div>
        <div className="d-flex justify-content-center">
          <TabSection firstTabHeading={tab1} secondTabHeading={tab2} />
        </div>

        <div
          className="tab-content d-flex justify-content-center"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active tab-width  "
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <MasterKarigarListing
              karigarData={filterList}
              defaultData={karigarData}
              HandleSearchInput={HandleSearchInput}
              placeholder={placeholder}
            />
          </div>
          <AddKarigar
            inputValue={inputValue}
            HandleInputValue={HandleInputValue}
            error={error}
            HandleSubmit={HandleSubmit}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};
export default MasterKarigar;
