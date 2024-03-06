import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Webcam from 'react-webcam';

const WebCamPurchaseReceipt = ({
  handleFieldChange,
  setShowWebcam,
  item,
  setCapturedImage,
}: any) => {
  const webcamRef = useRef<Webcam>(null);
  const [show, setShow] = useState(true);
  const [switchCamera, setSwitchCamera] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowWebcam(false);
  };
  const capturePhoto = async () => {
    const imageSrc = (webcamRef?.current as any)?.getScreenshot();

    if (imageSrc) {
      // Convert base64 to Blob
      const blob = await fetch(imageSrc).then((res) => res.blob());
      setCapturedImage(imageSrc);
      // Create FormData and append Blob
      console.log('blobbb', blob);
      handleFieldChange(item.idx, 'tableRow', 'custom_add_photo', blob, blob);
      console.log('blobb', blob);
    }
    setShowWebcam(false);
  };

  const handleSwitchCamera = () => {
    setSwitchCamera(!switchCamera);
    console.log(switchCamera, 'switch camera');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 465,
              height: 265,
              facingMode: switchCamera ? 'enviornment' : 'user',
            }}
            mirrored={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSwitchCamera}>
            Switch Camera
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={capturePhoto}>
            Take Photo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WebCamPurchaseReceipt;
