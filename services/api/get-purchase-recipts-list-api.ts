import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../config/api-config';

const getPurchasreceiptListApi = async (
  get_access_token: any,
  ready_receipt_type: string,
  param?: any
) => {
  console.log(param, 'param in listing');
  let response: any;
  let method: any = 'get_specific_purchase_receipt';
  let entity: any = 'specific_purchase_receipt';
  let custom_ready_receipt_type: any = ready_receipt_type;
  const getHeaders = headerGenerator(get_access_token?.token);

  const params = `version=v1&method=${
    param?.method ? param.method : method
  }&entity=${
    param?.entity ? param?.entity : entity
  }&custom_ready_receipt_type=${custom_ready_receipt_type}`;
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?${params}`,
      getHeaders
    )
    .then((res: any) => {
      response = res;
      console.log('purchase receipt response', response);
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

export default getPurchasreceiptListApi;
