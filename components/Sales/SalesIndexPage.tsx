import { useRouter } from 'next/router';
import React from 'react';
import SaleReturnsMaster from './SalesReturns/SalesReturnsMaster';
import CustomerSaleMaster from './CustomerSale/CustomerSaleMaster';

const SalesIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const key = pathcontent[pathcontent?.length - 1];
  return (
    <div className="container-lg">
      {key === 'customerSale' && <CustomerSaleMaster />}
      {key === 'saleReturns' && <SaleReturnsMaster />}
    </div>
  );
};

export default SalesIndexPage;
