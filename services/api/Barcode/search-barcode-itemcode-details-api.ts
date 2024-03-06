import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const getSearchBarcodeItemCodeDetails: any = async (request: any, karigar_name: any, get_access_token: any) => {
    console.log("reqqq", request, karigar_name)
    let response: any;
    const getHeaders = headerGenerator(get_access_token);

    // &stock=${request.stock}&barcode_created=${request.barcode_created}
    await axios
        .get(
            `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_item_wise_barcode_filter&entity=barcode&posting_date=${request.date}&custom_karigar=${karigar_name}&name=${request.item_group}&sr_from=${request.sr_no_from}&sr_to=${request.sr_no_to}&stock=${request.stock}`,
            getHeaders
        )
        .then((res: any) => {
            console.log('get karigar', res);
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

export default getSearchBarcodeItemCodeDetails;
