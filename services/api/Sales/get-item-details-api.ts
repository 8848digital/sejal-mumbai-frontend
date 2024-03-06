import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const getItemDetailsInSalesApi = async (
  get_access_token: any,
  item_code: any,
  method: any,
  entity: any
) => {
  console.log('item req', method, entity);
  let response: any;
  const getHeaders = headerGenerator(get_access_token);

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=${method}&entity=${entity}&name=${item_code}`,
      getHeaders
    )
    .then((res: any) => {
      console.log('get karigar', res);
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

export default getItemDetailsInSalesApi;
