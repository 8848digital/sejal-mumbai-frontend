import {
  getAccessToken,
  get_access_token,
} from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LoginMaster = () => {
  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);
  const [loginToken, setLoginToken] = useState('');
  console.log(loginAcessToken, 'selector');
  const router = useRouter();
  const [userData, setUserData] = useState<any>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<any>(false);

  const HandleInputChange: any = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  console.log(userData, 'userData');

  const HandleFormSubmit = async () => {
    const loginsucess = await dispatch(getAccessToken(userData));
    console.log(loginsucess, 'loginsucess');
    if (loginsucess.payload.msg == 'success') {
      toast.success('Login Successfully');
      setTimeout(() => {
        router.push('/master');
      }, 900);
    } else {
      toast.error('Incorrect Username or Password');
      router.push('/');
    }
  };

  const HandleEnterPress = (e: any) => {
    if (e.key == 'Enter') {
      HandleFormSubmit();
    }
  };
  const HandleShowPassword: any = () => {
    console.log('eye click');
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="container  d-flex justify-content-center login-page-container">
          <div className="row">
            <div className="col-lg-12 card shadow p-3 mb-5 bg-white rounded border-0 login-card">
              <div className="  p-lg-5 p-0">
                <p className="text-uppercase fs-3 text-center">login</p>
                <div className="card-body p-0">
                  <form className="login-form p-2 mx-auto text-center">
                    <div className="mb-3">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={HandleInputChange}
                        className="form-control login-input-field px-2"
                        placeholder="Username"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                    <div className="my-4">
                      <div className="d-flex justify-content-center pswd-container">
                        <input
                          type={`${showPassword ? 'text' : 'password'}`}
                          id="password"
                          name="password"
                          onChange={HandleInputChange}
                          onKeyDown={(e) => {
                            HandleEnterPress(e);
                          }}
                          className="form-control login-input-field px-2 "
                          placeholder="Password"
                          required
                        />
                        <i
                          className={`fa fa-eye p-0 pt-2 fs-6 pswd-eye-icon ${showPassword ? 'text-primary' : ''
                            } `}
                          onClick={HandleShowPassword}
                        ></i>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={HandleFormSubmit}
                      className="btn btn-primary mt-3 py-1 px-4"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginMaster;
