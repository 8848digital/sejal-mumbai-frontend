import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const ReportPrintApi = async (request: any) => {
  console.log('tokennnn', request);
  let response: any;

  const params = `/api/method/sj_antique.sdk.api?version=${request.version}&method=${request.method}&entity=${request.entity}&from_date=${request.from_date}&to_date=${request.to_date}`;

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
      console.log(err);
    });
  return response;
};

export default ReportPrintApi;
