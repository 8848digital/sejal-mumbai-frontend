import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/readyReceipts.module.css';
import WebCamPurchaseReceipt from './WebCamPurchaseReceipt';
import usePhotoModalHook from '@/hooks/PurchaseReceiptFileUploadHook/Purchase-receipt-file-upload-hook';
import Image from 'next/image';
import styled from '../../styles/readyReceipts.module.css';

const PurchaseReceiptFileUploadMaster = ({
  handleFieldChange,
  item,
  handleClearFileUploadInput,
  readOnlyFields,
  keyValue,
  handleCreate,
  handleUpdateReceipt,
}: any) => {
  const {
    handlePhotaModalClose,
    handleShowPhotoModal,
    handleFileChange,
    handleUploadClick,
    photoModalshow,
    fileInputRef,
    toggleWebcam,
    showWebcam,
    setShowWebcam,
    selectedImage,
    setSelectedImage,
    capturedImage,
    setCapturedImage,
    showPreview,
    handlePreview,
    switchCamera,
  } = usePhotoModalHook();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-75 ">
          <input
            type="text"
            className={` ${styles.input_field} text-center cursor`}
            placeholder="Attach"
            value={item?.custom_add_photo}
            onKeyDown={(e) => {
              keyValue === 'edit' ? handleUpdateReceipt() : handleCreate();
            }}
            onClick={() => {
              // if (!readOnlyFields) {
              handleShowPhotoModal(item);
              // }
            }}
          />
        </div>
        <div className="px-2">
          <i
            className={`fa fa-xmark mt-1 cursor`}
            onClick={() => {
              if (!readOnlyFields) {
                handleClearFileUploadInput(item.idx);
              }
            }}
          ></i>
        </div>
      </div>
      <Modal show={photoModalshow} onHide={handlePhotaModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {showPreview && (
              <>
                <Image
                  src={
                    capturedImage
                      ? capturedImage
                      : URL?.createObjectURL(selectedImage)
                  }
                  alt="Captured"
                  width={465}
                  height={300}
                  className="img-thumbnail"
                />

                <div className="text-center">
                  <button
                    className="btn btn-file-upload text-grey"
                    onClick={handlePreview}
                  >
                    <i className="fa-solid fa-xmark px-1 "></i>
                    Close Preview
                  </button>
                </div>
              </>
            )}
            {!showPreview && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-file-upload"
                  onClick={handleUploadClick}
                >
                  <i className="fa-solid fa-computer px-2 text-warning fs-5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_add_photo',
                          `/files/${e.target.files?.[0]?.name}`,
                          e.target.files?.[0]
                        ),
                          setSelectedImage(e.target.files?.[0]);
                      }}
                    />
                  </i>
                  <p className="m-0">My Device</p>
                </button>
                <button className="btn btn-file-upload" onClick={toggleWebcam}>
                  <i
                    className={`fa ${
                      showWebcam ? 'fa-times' : 'fa-camera'
                    } px-2 text-primary fs-5`}
                  ></i>
                  <p className="m-0">
                    {showWebcam ? 'Close Camera' : 'Camera'}
                  </p>
                </button>
                {showWebcam && (
                  <WebCamPurchaseReceipt
                    handleFieldChange={handleFieldChange}
                    setShowWebcam={setShowWebcam}
                    item={item}
                    setCapturedImage={setCapturedImage}
                    switchCamera={switchCamera}
                  />
                )}
              </div>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePhotaModalClose}>
            Cancel
          </Button>
          {(selectedImage || capturedImage) && (
            <Button variant="secondary" onClick={handlePreview}>
              Preview
            </Button>
          )}
          <Button variant="primary" onClick={handlePhotaModalClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PurchaseReceiptFileUploadMaster;
