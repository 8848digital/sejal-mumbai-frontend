import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';


const PrintPurchaseReceiptApi = async (token: any, name: any) => {
    console.log('tokennnn', token);
    let response: any;
    const version = 'v1';
    const method = 'get_print_purchase_receipt';
    const entity = 'print_purchase_receipt';

    const params = `/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${name}`;

    const config = {
        headers: {
            Authorization: token,
        },
    };

    await axios
        .get(`${CONSTANTS.API_BASE_URL}${params}`, config)
        .then((res: any) => {
            response = res.data.message;
        })
        .catch((err: any) => {
            console.log(err);
        });
    return response;
};

export default PrintPurchaseReceiptApi;
