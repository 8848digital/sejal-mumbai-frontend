
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth/login-slice';

const useTokenCheck = () => {
    const router = useRouter();
    const loginAccess = useSelector(get_access_token);

    useEffect(() => {
        if (!loginAccess.token && router.pathname !== '/') {
            router.push('/');
        }
    }, [loginAccess.token, router.pathname]);
};

export default useTokenCheck;
