import { CONSTANTS } from '@/services/config/api-config';
import { useRef, useState } from 'react';

const usePhotoModalHook: any = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoModalshow, setPhotoModalShow] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFile, setShowFile] = useState<any>();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePhotaModalClose = () => {
    setShowPreview(false);
    setPhotoModalShow(false);
    setCapturedImage(null);
    setShowWebcam(false);
    setSelectedImage(null);
  };
  const handleShowPhotoModal = (item: any) => {
    if (Object?.keys(item.custom_add_photo)?.length > 0) {
      window.open(`${CONSTANTS.API_BASE_URL}/${item.custom_add_photo}`);
    } else {
      setPhotoModalShow(true);
      setShowWebcam(false);
    }
  };
  const toggleWebcam = () => {
    setShowWebcam((prevState) => !prevState);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowFile(file);
    }
  };
  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return {
    handlePhotaModalClose,
    handleShowPhotoModal,
    handleFileChange,
    handleUploadClick,
    toggleWebcam,
    photoModalshow,
    fileInputRef,
    showWebcam,
    setShowWebcam,
    capturedImage,
    setCapturedImage,
    selectedImage,
    setSelectedImage,
    showPreview,
    handlePreview,
  };
};
export default usePhotoModalHook;
