import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const getKunCsOtCategoryApi = async (get_access_token: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_METHOD_SDK}?version=v1&method=get_kun_cs_ot_category&entity=kun_cs_ot_category`,
      getHeaders
    )
    .then((res: any) => {
      console.log('get Kun Cs Ot', res);
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

export default getKunCsOtCategoryApi;
