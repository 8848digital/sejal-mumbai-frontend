import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const GetSpecificPurchaseReceiptData = async (request: any) => {
  console.log('tokennnn', request);
  let response: any;
  const version = 'v1';
  const method = 'get_name_specific_purchase_receipt';
  const entity = 'purchase_receipt';

  const params = `/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

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
  console.log(response, 'specific receipt res');
  return response;
};

export default GetSpecificPurchaseReceiptData;
