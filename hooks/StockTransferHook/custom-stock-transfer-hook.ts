import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useCustomStockTransfer: any = () => {
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const handleDeleteStockTransfer: any = () => {};

  const handleUpdateDocStatus: any = async (docStatus: any, name: any) => {
    let id: any = name === undefined ? query?.stockId : name;
    const params = `/api/resource/Stock Entry/${id}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );
    console.log('update docstatus', updateDocStatus);
  };

  return { handleUpdateDocStatus, handleDeleteStockTransfer };
};

export default useCustomStockTransfer;
