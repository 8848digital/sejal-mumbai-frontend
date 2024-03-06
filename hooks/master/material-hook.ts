import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import getMaterialGroupApi from '@/services/api/Master/get-material-group-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postMaterialMasterApi from '@/services/api/Master/post-material-name';
import materialApi from '@/services/api/PurchaseReceipt/get-material-list-api';
import { toast } from 'react-toastify';

const useMaterialHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [materialList, setMaterialList] = useState();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [nameValue, setNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  const [inputValueM, setInputValueM] = useState('');
  const [errorM, setErrorM] = useState('');
  const [materialGroupList, setMaterialGroupList] = useState();
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState();
  const [matDropdownReset, setMatDropDownReset] = useState<boolean>(false);
  useEffect(() => {
    const getStateData: any = async () => {
      const materialData = await materialApi(loginAcessToken.token);
      const materialGroupData = await getMaterialGroupApi(
        loginAcessToken.token
      );
      setMaterialList(materialData);
      if (materialGroupData?.data?.message?.status === 'success') {
        setMaterialGroupList(materialGroupData?.data?.message?.data);
      }
      console.log(materialGroupList, 'material group data');
    };
    getStateData();
  }, []);
  const HandleNameChange = (e: any) => {
    console.log(nameValue, 'changing client');
    const { name, value } = e.target;
    setNameValue({ ...nameValue, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleSave = async () => {
    console.log(nameValue, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material',
      data: [{ ...nameValue, material_group: selectedMaterialGroup }],
    };
    console.log(values, 'valuesname');
    if (nameValue.material === '' || nameValue.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(error1);
    } else if (
      nameValue.material_abbr === '' ||
      nameValue.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else if (
      selectedMaterialGroup === '' ||
      selectedMaterialGroup === undefined
    ) {
      setError3('Input field cannot be empty');
    } else {
      let apiRes: any = await postMaterialMasterApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Material Name Created');
        const materialData = await materialApi(loginAcessToken.token);
        setMaterialList(materialData);
      } else {
        toast.error('Material Name already exist');
      }
      setError1('');
      setNameValue({
        material: '',
        material_abbr: '',
      });
      setMatDropDownReset(true);
    }
  };
  // post material group
  const HandleMaterialGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_material_group',
      entity: 'material_group',
      material_group: inputValueM,
    };
    console.log(values, 'valuesname');
    if (inputValueM.trim() === '') {
      setErrorM('Input field cannot be empty');
    } else {
      let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Material Group Created');
        const materialGrpData: any = await getMaterialGroupApi(
          loginAcessToken.token
        );
        setMaterialGroupList(materialGrpData?.data?.message?.data);
      } else {
        toast.error('Material Group already exist');
      }
      setErrorM('');
      setInputValueM('');
    }
  };
  const HandleMaterialGrpValue = (e: any) => {
    setErrorM('');
    setInputValueM(e.target.value);
    console.log(inputValueM, 'input value');
  };
  console.log(selectedMaterialGroup, 'selected material');
  return {
    materialList,
    error1,
    error2,
    error3,
    nameValue,
    HandleNameChange,
    HandleSave,
    HandleMaterialGrpSubmit,
    HandleMaterialGrpValue,
    errorM,
    setErrorM,
    materialGroupList,
    inputValueM,
    selectedMaterialGroup,
    setSelectedMaterialGroup,
    matDropdownReset,
    setMatDropDownReset,
  };
};
export default useMaterialHook;
