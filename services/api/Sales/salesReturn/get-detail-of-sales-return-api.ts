import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const GetDetailOfSalesReturnAPi = async (request: any) => {
  console.log('tokennnn', request);
  let response: any;
  const version = 'v1';
  const method = 'get_specific_delivery_note_sales_return';
  const entity = 'sales_return';

  const params = `${CONSTANTS.API_METHOD_SDK}?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

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
  console.log(response, 'specific receipt res');
  return response;
};

export default GetDetailOfSalesReturnAPi;
