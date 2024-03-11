import React from 'react';
import TabSection from '../TabSection';
import useStockTransfer from '@/hooks/StockTransferHook/stock-transfer-hook';
import KundanListing from '../KundanReadyReceipts/KundanReadyReceiptsListing';
import StockTransferListing from './StockTransferListing/StockTransferListing';
import StockTransferTopSection from './CreateStockTransfer/StockTransferTopSection';
import StockTransferTable from './CreateStockTransfer/StockTransferTable';

const StockTransferMaster = () => {
  const {
    stockTransferData,
    setStockTransferData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    handleNewStockTransfer,
    handleStockTransferCreate,
    handleAddRowForStockTransfer,
    handleDeleteRow,
    stockTransferListingData,
    setStockTransferListingData,
    handleSelectedLocation,
    itemCodeListData,
    warehouseList,
    sourceLocation,
    handleUpdateDocStatus,
  }: any = useStockTransfer();
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <TabSection
          firstTabHeading="Stock Transfer List"
          secondTabHeading="Create New Stock Transfer"
        />
      </div>
      <div className="tab-content " id="pills-tabContent">
        <div
          className="tab-pane fade show active tab-width"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="tab-responsive row">
            <div className="col-11 mx-auto">
              <StockTransferListing
                stockTransferListingData={stockTransferListingData}
                handleUpdateDocStatus={handleUpdateDocStatus}
              />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade w-auto"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div className="row justify-content-center">
            <div className="col-lg-9 mx-auto">
              <div className={`text-end mb-1  `}>
                <button
                  type="submit"
                  onClick={handleNewStockTransfer}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={handleStockTransferCreate}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  Create
                </button>
              </div>
              <StockTransferTopSection
                handleSelectedLocation={handleSelectedLocation}
                warehouseList={warehouseList}
                sourceLocation={sourceLocation}
              />
              <StockTransferTable
                stockTransferData={stockTransferData}
                setStockTransferData={setStockTransferData}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                itemCodeDropdownReset={itemCodeDropdownReset}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
                handleAddRowForStockTransfer={handleAddRowForStockTransfer}
                handleDeleteRow={handleDeleteRow}
                itemCodeListData={itemCodeListData}
                warehouseList={warehouseList}
                sourceLocation={sourceLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransferMaster;
