import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/header.module.css';
import { useRouter } from 'next/router';

const SalesHeader = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const saleReturnValue =
    (pathcontent?.length > 0 &&
      pathcontent !== null &&
      pathcontent?.includes('salereturns')) ||
    pathcontent?.includes('saleReturns');
  const customerSaleValue =
    pathcontent?.length > 0 &&
    pathcontent !== null &&
    (pathcontent?.includes('customersale') ||
      pathcontent?.includes('customerSale'));

  const [active, setActive] = useState(0);
  return (
    <div className="d-flex justify-content-center">
      <Link
        href="/sales/customerSale"
        className="text-decoration-none btn-margin"
        onClick={() => setActive(1)}
      >
        <button
          className={`${styles.button} ${
            customerSaleValue ? 'activeColor' : ''
          } `}
        >
          Sales
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/sales/saleReturns"
        className="text-decoration-none btn-margin"
        onClick={() => setActive(0)}
      >
        <button
          className={`${styles.button} ${saleReturnValue ? 'activeColor' : ''}`}
        >
          Sale Returns
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
    </div>
  );
};

export default SalesHeader;
