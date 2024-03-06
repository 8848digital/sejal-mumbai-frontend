import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import postBBCategoryApi from '@/services/api/Master/post-bbCategory-api';
import postClientApi from '@/services/api/Master/post-client-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postKunCsOtCategoryApi from '@/services/api/Master/post-kunCsOtCategory-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClientHook = () => {
  // const dispatch = useDispatch();
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // api states
  const [clientList, setClientList] = useState();
  const [clientGroupList, setClientGroupList] = useState();
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  const [searchClient, setSearchClient] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [errorC, setErrorC] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  console.log(searchClient, 'search client in dropdown');
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const clientGroupData: any = await getClientGroupApi(
        loginAcessToken.token
      );
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      console.log(clientData, 'kuncsotdata');

      if (clientGroupData?.data?.message?.status === 'success') {
        setClientGroupList(clientGroupData?.data?.message?.data);
      }
      if (clientData?.data?.message?.status === 'success') {
        setClientList(clientData?.data?.message?.data);
      }
      if (kunCsOtData?.data?.message?.status === 'success') {
        setKunCsOtCategory(kunCsOtData?.data?.message?.data);
      }
      if (BBData?.data?.message?.status === 'success') {
        setBBCategory(BBData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  console.log(clientGroupList, 'client group list');
  const [errorC1, setError1] = useState('');
  const [errorC2, setError2] = useState('');
  const [clientName, setClientNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  // client post api
  useEffect(() => {
    setClientNameValue({
      ...clientName,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  }, [searchClient]);
  const HandleClientNameChange = (e: any) => {
    const { value } = e.target;

    console.log(clientName, searchClient, 'client name saved');
    setClientNameValue({
      ...clientName,
      material: value,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  };
  const HandleClientSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_client',
      entity: 'client',
      client_name: clientName?.material,
      client_group: searchClient,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      console.log('inside console1');
      setError1('Input field cannot be empty');
      console.log(errorC1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      console.log('inside console2');
      setError2('Input field cannot be empty');
    } else {
      console.log('inside console3');
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Client Name Created');
        const clientData = await getClientApi(loginAcessToken.token);
        setClientList(clientData?.data?.message?.data);
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
    }
  };
  // KunCsOt category post api
  const HandleKunCsOtChange = (e: any) => {
    console.log(clientName, 'changing client');
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  console.log(clientName, 'clientName');
  const HandleKunCsOtSave = async () => {
    console.log(clientName, 'Kun Cat saved');
    const values = {
      version: 'v1',
      method: 'create_kun_cs_ot_category',
      entity: 'kun_cs_ot_category',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      console.log('in condition 1');
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      console.log('in condition 2');
      setError2('Input field cannot be empty');
    } else {
      console.log('in condition 3');
      let apiRes: any = await postKunCsOtCategoryApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Kun-Cs-Ot Category Created');
        const KunData = await getKunCsOtCategoryApi(loginAcessToken.token);
        setKunCsOtCategory(KunData?.data?.message?.data);
      } else {
        toast.error('Kun-Cs-Ot Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };
  // post bb category api
  const HandleBBChange = (e: any) => {
    console.log(clientName, 'changing client');
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  console.log(clientName, 'clientName');
  const HandleBBSave = async () => {
    console.log(clientName, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_bb_category',
      entity: 'bb_category',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(errorC1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postBBCategoryApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('BB Category Created');
        const BbData = await getBBCategoryApi(loginAcessToken.token);
        setBBCategory(BbData?.data?.message?.data);
      } else {
        toast.error('BB Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };

  // client group post api
  const HandleClientGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_client_group',
      entity: 'client_group',
      client_group: inputValue1,
    };
    console.log(values, 'valuesname');
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Group Created');
        const clientGrpData: any = await getClientGroupApi(
          loginAcessToken.token
        );
        setClientGroupList(clientGrpData?.data?.message?.data);
      } else {
        toast.error('Client Group already exist');
      }
      setErrorC('');
      setInputValue1('');
    }
  };
  const HandleClientGrpValue = (e: any) => {
    setErrorC('');
    setInputValue1(e.target.value);
    console.log(inputValue1, 'input value');
  };
  const handleSelectClientGroup = (value: any) => {
    setSearchClient(value);
  };

  return {
    clientList,
    HandleClientNameChange,
    HandleClientSave,
    KunCsOtCategory,
    BBCategory,
    clientName,
    HandleKunCsOtChange,
    HandleKunCsOtSave,
    HandleBBChange,
    HandleBBSave,
    setSearchClient,
    searchClient,
    errorC1,
    errorC2,
    errorC,
    setErrorC,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    inputValue1,
    clientGroupList,
    handleSelectClientGroup,
    selectDropDownReset,
    setSelectDropDownReset,
  };
};
export default useClientHook;
