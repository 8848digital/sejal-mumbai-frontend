import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const PrintApi = async (request: any) => {
  console.log('tokennnn', request);
  let response: any;

  const params = `/api/method/sj_antique.sdk.api?version=${request.version}&method=${request.method}&entity=${request.entity}&name=${request.name}`;

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

export default PrintApi;
