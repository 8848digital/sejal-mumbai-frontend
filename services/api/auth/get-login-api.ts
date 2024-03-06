import axios from 'axios';
import { CONSTANTS } from '../../config/api-config';

const getAccessTokenApi = async (param: any) => {
  let response: any;
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_access_token&entity=access_token&usr=${param.username}&pwd=${param.password}`
    )
    .then((res: any) => {
      console.log('Access token', res?.data?.message);
      response = res?.data?.message;
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

export default getAccessTokenApi;
