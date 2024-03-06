import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from '../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../CustomerSale/CustomerSalesTable1';
import TabSection from '@/components/TabSection';
import UseSalesReturnMasterHook from '@/hooks/Sales/Sales-Returns/sales-return-master-hook';
import KundanListing from '@/components/KundanReadyReceipts/KundanReadyReceiptsListing';
import UseScrollbarHook from '@/hooks/Report/report-table-scrollbar-hook';

const SaleReturnsMaster = () => {
  const {
    salesReturnTableData,
    setSalesReturnTableData,
    itemList,
    clientNameListData,
    selectedClient,
    setSelectedClient,
    handleSRCreate,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleSalesReturnTableFieldChange,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    handleSelectClientGroup,
    setItemCodeDropdownReset,
    HandleUpdateDocStatus,
    saleReturnDeliveryNoteListing,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    setDeliveryNoteData,
    deliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    handleTabPressItemDetails,
    selectedItemCode,
    setSelectedItemCode,
  }: any = UseSalesReturnMasterHook();

  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = UseScrollbarHook();

  const salesReturnListing =
    saleReturnDeliveryNoteListing && saleReturnDeliveryNoteListing.length > 0
      ? saleReturnDeliveryNoteListing.filter((data: any) => {
        return data.is_return === 1;
      })
      : [];

  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div>
        <div className="d-flex d-flex justify-content-center">
          <TabSection
            firstTabHeading="Sale Returns"
            secondTabHeading="Create New Sales Return"
          />
        </div>

        <div className="tab-content " id="pills-tabContent">
          <div
            className="tab-pane fade show active tab-width"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="tab-responsive">
              <KundanListing
                kundanListing={salesReturnListing}
                karigarData={
                  clientNameListData?.length > 0 &&
                  clientNameListData !== null &&
                  clientNameListData.map((data: any) => ({
                    karigar_name: data.client_name,
                  }))
                }
                colPlaceholder1={'Sales no.'}
                colPlaceholder2={'Client '}
                HandleDeleteReceipt={handleDeleteSalesReturn}
                HandleUpdateDocStatus={HandleUpdateDocStatus}
                printApiMethod={'print_delivery_note_sales'}
                printApiEntity={'sales'}
                deleteApiVersion={'v1'}
                deleteApiMethod={'delete_delivery_note_sales_return'}
                deleteApiEntity={'sales_return'}
                kunKarigarDropdownReset={itemCodeDropdownReset}
                setKunKarigarDropdownReset={setItemCodeDropdownReset}
              // purchasRecieptListParams={deliveryNoteListParams}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div className={`text-end mb-1`}>
                <button
                  type="submit"
                  onClick={handleEmptySaleReturnData}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={handleSRCreate}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  Create
                </button>
              </div>
              <CustomerSalesTable1
                clientNameListData={clientNameListData}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                handleSelectClientGroup={handleSelectClientGroup}
                clientGroupList={
                  clientNameListData?.length > 0 &&
                  clientNameListData !== null &&
                  clientNameListData.map((clientData: any) => ({
                    ...clientData,
                    client_group: clientData.client_group,
                  }))
                }
                title="Sales Return No"
                warehouseListData={warehouseListData}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                setDeliveryNoteData={setDeliveryNoteData}
                deliveryNoteData={deliveryNoteData}
                itemCodeDropdownReset={itemCodeDropdownReset}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
              />

              <CustomerSalesTable
                handleSalesTableFieldChange={handleSalesReturnTableFieldChange}
                salesTableData={salesReturnTableData}
                setSalesTableData={setSalesReturnTableData}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                handleAddRowForSales={handleAddRowForSalesReturn}
                handleDeleteRowOfSalesTable={handleDeleteRowOfSalesReturnTable}
                itemCodeList={
                  itemList?.length > 0 &&
                  itemList !== null &&
                  itemList.map((data: any) => ({
                    karigar_name: data?.name,
                  }))
                }
                itemCodeDropdownReset={itemCodeDropdownReset}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
                handleTabPressInSales={handleTabPressInSales}
                kunCsOtFixedAmt={kunCsOtFixedAmt}
                setKunCsOtFixedAmt={setKunCsOtFixedAmt}
                HandleFixedAmt={HandleFixedAmt}
                showAddrowBtn={true}
                scrollableTableRef={scrollableTableRef}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseLeave={handleMouseLeave}
                handleMouseMove={handleMouseMove}
                handleTabPressItemDetails={handleTabPressItemDetails}
                selectedItemCode={selectedItemCode}
                setSelectedItemCode={setSelectedItemCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReturnsMaster;
