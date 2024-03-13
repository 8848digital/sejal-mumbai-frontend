import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const getSourceWarehouseItemCode: any = async (request: any) => {
  let response: any;
  const getHeaders = headerGenerator(request.token);
  const params: any = `/api/method/sejal_mumbai.sdk.api?version=v1&method=source_warehouse_item_code&entity=stock_entry&warehouse=${request.warehouse_name}`;

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${params}`, getHeaders)
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

export default getSourceWarehouseItemCode;
