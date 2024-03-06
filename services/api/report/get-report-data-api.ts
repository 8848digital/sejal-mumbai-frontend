import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const ReportApi = async (get_access_token: any, params: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  console.log(params, '@report params');
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${params?.version}&method=${params?.method}&entity=${params?.entity}&name=${params?.name}&voucher_no=${params?.voucher_no}&from_date=${params?.from_date}&to_date=${params?.to_date}`,
      getHeaders
    )
    .then((res: any) => {
      console.log('get item status report', res);
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

export default ReportApi;
