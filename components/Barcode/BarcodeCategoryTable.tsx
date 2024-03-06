import CustomerSalesTable2 from '../Sales/CustomerSale/CustomerSalesTable2';

const BarcodeCategorySection = ({
  itemCodeDataToShow,
  handleGenerateBarcodeListBtn,
  handleCheckboxChange,
  checkedItems,
  kunCsOtCategoryData,
  BBcategoryData,
  selectedCategory,
  setSeletedCategory,
  handleSelectChange,
}: any) => {
  console.log('itemCodeDataToShow', checkedItems, itemCodeDataToShow);
  return (
    <div className="tab-width ">
      <div>
        <button
          type="button"
          className="btn btn-primary p-0 px-2 my-2"
          onClick={handleGenerateBarcodeListBtn}
        >
          Generate Barcode List
        </button>

        <CustomerSalesTable2
          kunCsOtCategoryListData={kunCsOtCategoryData}
          BBCategoryListData={BBcategoryData}
          selectedCategory={selectedCategory}
          setSeletedCategory={setSeletedCategory}
          handleSelectChange={handleSelectChange}
        />

        <div className="row">
          {itemCodeDataToShow?.length > 0 && itemCodeDataToShow !== null ? (
            <>
              {itemCodeDataToShow.map((data: any, index: any) => (
                <div className="col-lg-3 col-4" key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checkedItems?.some(
                        (checkedItem: any) => checkedItem.id === index
                      )}
                      onChange={() => handleCheckboxChange(index, data.name)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      {data?.item_code}
                    </label>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeCategorySection;
