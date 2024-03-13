import useStockTranferDetail from '@/hooks/StockTransferHook/stock-transfer-detail-hook';
import React from 'react';
import StockTransferTopSection from '../CreateStockTransfer/StockTransferTopSection';
import StockTransferTable from '../CreateStockTransfer/StockTransferTable';
import DetailPageButtonsSection from './DetailPageButtonsSection';
import { useSelector } from 'react-redux';
import { get_detail_stock_transfer_data } from '@/store/slices/stockTransfer/get-detail-of-stock-transfer-slice';
import Loader from '@/components/NoRecord/Loader';
import NoRecord from '@/components/NoRecord/NoRecord';
import { useRouter } from 'next/router';

const DetailOfStockTransfer = () => {
  const {
    stockTransferData,
    setStockTransferData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    handleStockTransferCreate,
    handleNewStockTransfer,
    handleAddRowForStockTransfer,
    handleDeleteRow,
    stockTransferListingData,
    setStockTransferListingData,
    handleSelectedLocation,
    itemCodeListData,
    warehouseList,
    sourceLocation,
    setSourceLocation,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateStockTransfer,
    handleDeleteStockTransfer,
    handleUpdateDocStatus,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    handleAmendButtonForDuplicateRecord,
    isLoading,
  }: any = useStockTranferDetail();
  const router = useRouter();

  const pathParts = router?.asPath?.split('/');
  const queryType = pathParts[1];

  const stockTransferDetailFromStore: any = useSelector(
    get_detail_stock_transfer_data
  );
  console.log('stockTransferData', stockTransferData);

  return (
    <div className="container mt-3">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {stockTransferDetailFromStore?.data?.length === 0 &&
          isLoading === false ? (
            <NoRecord
              title="Stock Transfer"
              content="Sorry for disappointing you! We’re unable to find any relevant data"
              backButtonUrl={`/${queryType}`}
            />
          ) : (
            <div className="row">
              <div className="col-lg-9 mx-auto">
                <DetailPageButtonsSection
                  data={
                    stockTransferDetailFromStore?.data?.length > 0 &&
                    stockTransferDetailFromStore?.data?.[0]
                  }
                  stateForDocStatus={stateForDocStatus}
                  setStateForDocStatus={setStateForDocStatus}
                  handleUpdateStockTransfer={handleUpdateStockTransfer}
                  HandleDeleteRecord={handleDeleteStockTransfer}
                  handleUpdateDocStatus={handleUpdateDocStatus}
                  setReadOnlyFields={setReadOnlyFields}
                  readOnlyFields={readOnlyFields}
                  setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
                  showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
                  handleAmendButtonForDuplicateRecord={
                    handleAmendButtonForDuplicateRecord
                  }
                />
                <StockTransferTopSection
                  warehouseList={warehouseList}
                  sourceLocation={sourceLocation}
                  handleSelectedLocation={handleSelectedLocation}
                  stockTransferData={stockTransferData}
                  readOnlyFields={readOnlyFields}
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
                  readOnlyFields={readOnlyFields}
                  sourceLocation={sourceLocation}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailOfStockTransfer;
