import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const UpdateDocStatusApi: any = async (
  token: any,
  docStatus: any,
  params: any
) => {
  let response: any;

  console.log("api fire")
  // const params = `/api/resource/Purchase Receipt/${name}`;

  let body = {
    docstatus: docStatus,
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .put(`${CONSTANTS.API_BASE_URL}${params}`, body, config)
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

export default UpdateDocStatusApi;
