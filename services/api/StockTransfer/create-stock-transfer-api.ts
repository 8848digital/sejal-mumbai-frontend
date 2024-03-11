import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';
import PostApi from '../general/post-api';

const CreateStockTransferApi = async (get_access_token: any, val: any) => {
  console.log(val, 'vals');

  let response: any;
  const getHeaders = headerGenerator(get_access_token);

  response = await PostApi({ getHeaders, val });

  return response;
};

export default CreateStockTransferApi;
