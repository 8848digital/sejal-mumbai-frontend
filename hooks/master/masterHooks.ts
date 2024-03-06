import postKarigarApi from '@/services/api/Master/post-karigar-name';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import kundanKarigarApi from '@/services/api/PurchaseReceipt/get-kundan-karigar-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMasterHooks = () => {
  const router = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const show = useRef<boolean>(false);
  // get api states
  const [karigarList, setKarigarList] = useState();
  const [kunKarigarList, setKunKarigarList] = useState();

  // get api functions
  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);
      const kunKarigarData = await kundanKarigarApi(loginAcessToken.token);
      console.log(karigarData, 'KarigarData Master');
      setKarigarList(karigarData);
      setKunKarigarList(kunKarigarData);
    };
    getStateData();
  }, []);
  //post karigar name
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const HandleSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_karigar',
      entity: 'karigar',
      karigar_name: inputValue,
    };
    console.log(values, 'values');
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
      console.log(error);
    } else {
      let apiRes: any = await postKarigarApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Karigar Name Created');
        const karigarApi: any = await getKarigarApi(loginAcessToken.token);
        console.log(karigarApi, 'data after post api');
        setKarigarList(karigarApi);
      } else {
        toast.error('Karigar Name already exist');
      }
      setError('');
      setInputValue('');
    }
  };
  const HandleInputValue = (e: any) => {
    setError('');
    setInputValue(e.target.value);
    console.log(inputValue, 'input value');
  };
  // post kundan karigar api
  const HandleKunSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_kundan_karigar',
      entity: 'kundan_karigar',
      karigar_name: inputValue,
    };
    console.log(values, 'values');
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
      console.log(error);
    } else {
      let apiRes: any = await postKunKarigarApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Kundan Karigar Name Created');
        const karigarApi = await kundanKarigarApi(loginAcessToken?.token);
        setKunKarigarList(karigarApi);
      } else {
        toast.error('Kundan Karigar Name already exist');
      }
      setError('');
      setInputValue('');
    }
    console.log(kunKarigarList, 'new added');
  };
  const HandleKunInputValue = (e: any) => {
    setError('');
    setInputValue(e.target.value);
    console.log(inputValue, 'input value');
  };

  return {
    karigarList,
    kunKarigarList,
    inputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
    router,
    show,
  };
};

export default useMasterHooks;
