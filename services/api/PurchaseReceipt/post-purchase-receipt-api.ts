import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const purchaseReceiptApi = async (get_access_token: any, val: any) => {
  console.log(val, 'vals');

  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: get_access_token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`,
      val,
      getHeaders
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

export default purchaseReceiptApi;
