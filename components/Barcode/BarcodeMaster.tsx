import UseBarcodeFilterList from '@/hooks/Barcode/barcode-filter-hook';
import CustomerSalesTable from '../Sales/CustomerSale/CustomerSalesTable';
import TabSection from '../TabSection';
import BarcodeCategorySection from './BarcodeCategoryTable';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeListingTable from './BarcodeListingTable';
import useBarcodeListingHook from '@/hooks/Barcode/barcode-listing-hook';
import { useState } from 'react';
import UseScrollbarHook from '@/hooks/Report/report-table-scrollbar-hook';
import BarcodeTabSection from './BarcodetabSection';
// import BarcodeListingTable from './BarcodeListingTable';

const BarcodeMaster = () => {
  const {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
    handleSearchBarcodeItemCodeDetails,
    handleSearchBtn,
    itemCodeDataToShow,
    showCategorySection,
    handleGenerateBarcodeListBtn,
    showBarcodeTableSection,
    handleCheckboxChange,
    checkedItems,
    kunCsOtCategoryData,
    BBcategoryData,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    salesTableData,
    setSalesTableData,
    handleBarcodeTableFieldChange,
    HandleCreateBarcode,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    itemList,
    selectedItemCode,
    setSelectedItemCode,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    handleTabPress,
    BarcodeListData,
    handleCheckboxForBarcodePrint,
    handleMultipleBarcodePrint,
    multipleRecordsForPrint,
    handleBarcodePrint,
    selectAll,
    setSelectAll,
    handleSelectAll,
  }: any = UseBarcodeFilterList();

  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = UseScrollbarHook();
  const [searchItemCode, setSearchItemCode] = useState<any>('');

  const filteredList =
    BarcodeListData?.length > 0 && BarcodeListData !== null && searchItemCode
      ? BarcodeListData.filter((item: any) => {
          const itemCodeMatch = searchItemCode
            ? item?.item_code
                ?.toLowerCase()
                ?.includes(searchItemCode?.toLowerCase())
            : true;
          return itemCodeMatch;
        })
      : BarcodeListData;

  return (
    <div className="container-lg">
      <div className="d-flex justify-content-center">
        <BarcodeTabSection
          firstTabHeading="Barcode List"
          secondTabHeading="Create New Barcode"
        />
      </div>
      <div className="tab-content " id="pills-tabContent">
        <div
          className="tab-pane fade tab-width"
          id="pills-list"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="tab-responsive">
            <BarcodeListingTable
              BarcodeListData={filteredList}
              handleMultipleBarcodePrint={handleMultipleBarcodePrint}
              handleCheckboxForBarcodePrint={handleCheckboxForBarcodePrint}
              setSearchItemCode={setSearchItemCode}
              searchItemCode={searchItemCode}
              handleBarcodePrint={handleBarcodePrint}
              multipleRecordsForPrint={multipleRecordsForPrint}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
              handleSelectAll={handleSelectAll}
            />
          </div>
        </div>
        <div
          className="tab-pane active fade show"
          id="pills-create"
          role="tabpanel"
          aria-labelledby="pills-create-tab"
        >
          <div className="d-flex justify-content-center">
            <BarcodeFilterListing
              karigarList={karigarList}
              searchKarigar={searchKarigar}
              setSearchKarigar={setSearchKarigar}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
              handleSearchBarcodeItemCodeDetails={
                handleSearchBarcodeItemCodeDetails
              }
              handleSearchBtn={handleSearchBtn}
            />
          </div>
          {showCategorySection && (
            <div className="d-flex justify-content-center ">
              <BarcodeCategorySection
                itemCodeDataToShow={itemCodeDataToShow}
                handleGenerateBarcodeListBtn={handleGenerateBarcodeListBtn}
                handleCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
                kunCsOtCategoryData={kunCsOtCategoryData}
                BBcategoryData={BBcategoryData}
                selectedCategory={selectedCategory}
                setSeletedCategory={setSeletedCategory}
                handleSelectChange={handleSelectChange}
              />
            </div>
          )}
          {showBarcodeTableSection && (
            <>
              <button
                className="btn btn-primary mt-2 mb-2 py-1 px-2"
                onClick={HandleCreateBarcode}
              >
                Create Barcode
              </button>
              <CustomerSalesTable
                salesTableData={salesTableData}
                setSalesTableData={setSalesTableData}
                handleSalesTableFieldChange={handleBarcodeTableFieldChange}
                itemCodeDropdownReset={itemCodeDropdownReset}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
                itemList={itemList}
                selectedItemCode={selectedItemCode}
                setSelectedItemCode={setSelectedItemCode}
                showAddrowBtn={false}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                handleAddRowForSales={handleAddRowForSales}
                handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
                showAdditionalInputForCalculation={false}
                scrollableTableRef={scrollableTableRef}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseLeave={handleMouseLeave}
                handleMouseMove={handleMouseMove}
                // readOnlyFields,

                // setStateForDocStatus,
                // itemCodeDropdownReset,
                // setItemCodeDropdownReset,
                // handleTabPressInSales,
                // setStateForDocStatus,
                // itemCodeDropdownReset,
                // setItemCodeDropdownReset,
                handleTabPressInSales={handleTabPress}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeMaster;
