import axios from 'axios';
import { CONSTANTS } from '@/services/config/api-config';

const PostApi = async ({ getHeaders, val }: any) => {
  try {
    const response = await axios.post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_METHOD_SDK}`,
      val,
      { headers: getHeaders }
    );
    return response.data;
  } catch (err: any) {
    if (err.code === 'ECONNABORTED') {
      return 'Request timed out';
    } else if (err.code === 'ERR_BAD_REQUEST') {
      return 'Bad Request';
    } else if (err.code === 'ERR_INVALID_URL') {
      return 'Invalid URL';
    } else if (err.response && err.response.status === 400) {
      return 'Bad Request'; // Example handling of specific HTTP error code
    } else {
      return err.message; // General error handling
    }
  }
};

export default PostApi;
