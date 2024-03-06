import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';

const UseDeliveryNoteHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [deliveryNoteListing, setDeliveryNoteListing] = useState();

  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note',
    entity: 'sales',
  };
  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);

  return {
    deliveryNoteListing,
  };
};
export default UseDeliveryNoteHook;
