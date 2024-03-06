import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const getClientApi = async (get_access_token: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_client&entity=client`,
      getHeaders
    )
    .then((res: any) => {
      console.log('get client', res);
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

export default getClientApi;
