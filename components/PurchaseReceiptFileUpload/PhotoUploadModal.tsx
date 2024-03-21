import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/readyReceipts.module.css';
import WebCamPurchaseReceipt from './WebCamPurchaseReceipt';

const PhotoUploadModal = ({ handleFieldChange, item }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoModalshow, setPhotoModalShow] = useState(false);
  const [showFile, setShowFile] = useState<any>();

  const handlePhotaModalClose = () => setPhotoModalShow(false);
  const handleShowPhotoModal = () => setPhotoModalShow(true);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowFile(file);
    }
  };
  return (
    <>
      <input
        type="text"
        className={` ${styles.input_field} `}
        placeholder="upload"
        value={item?.custom_add_photo}
        onClick={handleShowPhotoModal}
      />

      <Modal show={photoModalshow} onHide={handlePhotaModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="d-block text-center "> */}
          {/* <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              value={showFile}
            /> */}
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary">
              <i
                className="fa-solid fa-computer px-2 text-primary fs-5"
                onClick={handleUploadClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  // onChange={(e) =>
                  //   handleFieldChange(
                  //     item?.idx,
                  //     'tableRow',
                  //     'custom_add_photo',
                  //     `/files/${e.target.files?.[0]?.name}`,
                  //     e.target.files?.[0]
                  //   )
                  // }
                />
              </i>
              <p onClick={handleUploadClick}>My computer</p>
            </button>
            <button className="btn btn-file-upload">
              <WebCamPurchaseReceipt />
            </button>
          </div>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePhotaModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleFieldChange(
                item?.idx,
                'tableRow',
                'custom_add_photo',
                `/files/${showFile?.[0]?.name}`,
                showFile?.[0]
              );
            }}
            onMouseDown={handlePhotaModalClose}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhotoUploadModal;
