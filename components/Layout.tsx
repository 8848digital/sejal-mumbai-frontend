import { useRouter } from 'next/router';
import Navbar from './Navbar/Navbar';
import useTokenCheck from '@/hooks/check-token-exist';

const Layout = ({ children }: any) => {
  const router = useRouter();
  useTokenCheck();

  return (
    <>
      {router.pathname === '/' ? '' : <Navbar />}
      {children}
    </>
  );
};

export default Layout;
