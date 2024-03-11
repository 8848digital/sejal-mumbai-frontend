import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const DeleteApi = async (
  token: any,
  version: any,
  method: any,
  entity: any,
  name: any
) => {
  let response: any;
  //   const version = 'v1';
  //   const method = 'delete_purchase_receipt_delete';
  //   const entity = 'delete_purchase_receipts';

  const params = `${CONSTANTS.API_METHOD_SDK}?version=${version}&method=${method}&entity=${entity}&name=${name}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${params}`, config)
    .then((res: any) => {
      response = res;
      console.log(response, 'deleteRes');
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

export default DeleteApi;
