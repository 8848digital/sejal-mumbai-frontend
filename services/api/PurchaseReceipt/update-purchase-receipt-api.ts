import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const UpdatePurchaseReceiptApi = async (token: any, val: any, name: any) => {
  console.log(val, 'vals');

  let response: any;

  const params = `/api/method/sj_antique.sdk.api`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .put(
      `${CONSTANTS.API_BASE_URL}${params}`,
      val,
      config
    )
    .then((res: any) => {
      console.log('post purchase receipt', res);
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

export default UpdatePurchaseReceiptApi;
