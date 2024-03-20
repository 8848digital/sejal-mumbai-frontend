import React, { useEffect } from 'react';
import ModalMaster from './ModalMaster';
import { Button, Modal } from 'react-bootstrap';

const PurchaseReceiptModal = ({
  tableData,
  showModal,
  closeModal,
  handleModalFieldChange,
  handleAddRow,
  materialWeight,
  setMaterialWeight,
  materialListData,
  calculateRowValue,
  handleDeleteChildTableRow,
  setRecipitData,
  recipitData,
  selectedDropdownValue,
  setSelectedDropdownValue,
  handleSaveModal,
  readOnlyFields,
  setReadOnlyFields,
  handleTabPressOnModal,
}: any) => {
  useEffect(() => {
    // Function to handle keydown event
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key combination matches alt+s
      if (event.altKey && event.key === 's') {
        // Prevent default behavior to avoid triggering browser shortcuts
        event.preventDefault();
        // Call the handleSaveModal function
        handleSaveModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSaveModal]);
  return (
    <div>
      {tableData?.length > 0 &&
        tableData !== null &&
        tableData.map((item: any, index: any) => (
          <Modal
            size="xl"
            fullscreen="lg-down"
            // scrollable={true}
            // className="h-50"
            show={showModal}
            onHide={closeModal}
            key={index}
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Material
              </Modal.Title>
            </Modal.Header>
            <ModalMaster
              handleModalFieldChange={handleModalFieldChange}
              handleAddRow={handleAddRow}
              materialWeight={materialWeight}
              setMaterialWeight={setMaterialWeight}
              materialListData={materialListData}
              calculateRowValue={calculateRowValue}
              handleDeleteChildTableRow={handleDeleteChildTableRow}
              setRecipitData={setRecipitData}
              recipitData={recipitData}
              selectedDropdownValue={selectedDropdownValue}
              setSelectedDropdownValue={setSelectedDropdownValue}
              readOnlyFields={readOnlyFields}
              setReadOnlyFields={setReadOnlyFields}
              handleTabPressOnModal={handleTabPressOnModal}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSaveModal(item.idx)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
    </div>
  );
};

export default PurchaseReceiptModal;
