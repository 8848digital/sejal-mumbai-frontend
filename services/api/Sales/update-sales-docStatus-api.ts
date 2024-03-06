import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const UpdateSalesDocStatusApi: any = async (
  token: any,
  docStatus: any,
  name: any
) => {
  let response: any;

  const params = `/api/resource/Delivery Note/${name}`;

  let body = {
    docstatus: docStatus,
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .put(`${CONSTANTS.API_BASE_URL}/${params}`, body, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return response;
};

export default UpdateSalesDocStatusApi;
