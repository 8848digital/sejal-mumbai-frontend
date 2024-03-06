import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const AmendDeliveryNoteApi = async (token: any, val: any) => {
  let response: any;

  const params = `/api/resource/Delivery Note`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${params}`, val, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });

  return response;
};

export default AmendDeliveryNoteApi;
