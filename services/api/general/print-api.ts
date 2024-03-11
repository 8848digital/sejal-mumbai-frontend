import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const PrintApi = async (request: any) => {
  console.log('tokennnn', request);
  let response: any;

  const params = `${CONSTANTS.API_METHOD_SDK}?version=${request.version}&method=${request.method}&entity=${request.entity}&name=${request.name}`;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${params}`, config)
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

export default PrintApi;
