import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/header.module.css';

const ReceiptsHeader = ({
  showReceipt,
  setShowReceipts,
  showSales,
  setShowSales,
  showMaster,
  setShowMaster,
  showReport,
  setShowReport,
  showBarcode,
  setShowBarcode,
  showStock,
  setShowStock,
}: any) => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const value = pathcontent[1];

  useEffect(() => {
    if (value === 'readyReceipt') {
      setShowReceipts(true);
    }
    if (value === 'master') {
      setShowMaster(true);
    }
    if (value === 'sales') {
      setShowSales(true);
    }
    if (value === 'report') {
      setShowReport(true);
    }
    if (value === 'barcode') {
      setShowBarcode(true);
    }
    if (value === 'stock-transfer') {
      setShowStock(true);
    }
  }, [
    setShowMaster,
    setShowReceipts,
    setShowSales,
    setShowReport,
    setShowBarcode,
    setShowStock,
    value,
  ]);

  const handleReadyRecipt = (val: any) => {
    switch (val) {
      case 'Receipts':
        setShowReceipts(true);
        setShowSales(false);
        setShowMaster(false);
        setShowReport(false);
        setShowBarcode(false);
        setShowStock(false);
        break;
      case 'Sales':
        setShowSales(true);
        setShowReceipts(false);
        setShowMaster(false);
        setShowReport(false);
        setShowBarcode(false);
        setShowStock(false);
        break;
      case 'Master':
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
        setShowBarcode(false);
        setShowStock(false);
        break;
      case 'Report':
        setShowMaster(false);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(true);
        setShowBarcode(false);
        setShowStock(false);
        break;
      case 'Barcode':
        setShowBarcode(true);
        setShowMaster(false);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
        setShowStock(false);
        break;
      case 'stock-transfer':
        setShowStock(true);
        setShowBarcode(false);
        setShowMaster(false);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
        break;
      default:
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
        setShowBarcode(false);
        setShowStock(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        <div>
          <Link className="text-decoration-none btn-margin" href="/master">
            <button
              className={`${styles.button} ${showMaster ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Master')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Master
            </button>
          </Link>
        </div>
        <div>
          <Link
            className="text-decoration-none btn-margin"
            href="/readyReceipt/kundan"
          >
            <button
              onClick={() => handleReadyRecipt('Receipts')}
              className={`${styles.button} ${
                showReceipt ? 'activeColor' : ''
              } `}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Ready Receipts
            </button>
          </Link>
        </div>
        <div>
          <Link
            className="text-decoration-none btn-margin"
            href="/sales/customerSale"
          >
            <button
              className={`${styles.button} ${showSales ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Sales')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Sales
            </button>
          </Link>
        </div>
        <div>
          <Link className="text-decoration-none btn-margin" href="/report">
            <button
              className={`${styles.button} ${showReport ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Report')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Report
            </button>
          </Link>
          <Link className="text-decoration-none btn-margin" href="/barcode">
            <button
              className={`${styles.button} ${showBarcode ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Barcode')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Barcode
            </button>
          </Link>
          <Link
            className="text-decoration-none btn-margin"
            href="/stock-transfer"
          >
            <button
              className={`${styles.button} ${showStock ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('stock-transfer')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Stock Transfer
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReceiptsHeader;
