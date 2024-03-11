import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { ClearToken } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import ReceiptsHeader from '../Header/ReceiptsHeader';
import ReadyReceiptsTabs from '../KundanReadyReceipts/ReadyReceiptsTabs';

const Navbar = () => {
  const router = useRouter();
  const [showReceipt, setShowReceipts] = useState<boolean>(false);
  const [showSales, setShowSales] = useState<boolean>(false);
  const [showMaster, setShowMaster] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [showBarcode, setShowBarcode] = useState<boolean>(false);
  const [showStock, setShowStock] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ClearToken());
    router.push('/');
  };

  return (
    <div className="container-lg">
      <div className=" bg-light">
        <nav
          className="d-flex"
          // className="container-lg mt-2 d-flex flex-wrap justify-content-between "
        >
          {/* <div></div> */}
          <div className="container-lg mt-2 d-flex flex-wrap justify-content-center ">
            <ReceiptsHeader
              showReceipt={showReceipt}
              setShowReceipts={setShowReceipts}
              showSales={showSales}
              setShowSales={setShowSales}
              showMaster={showMaster}
              setShowMaster={setShowMaster}
              showReport={showReport}
              setShowReport={setShowReport}
              showBarcode={showBarcode}
              setShowBarcode={setShowBarcode}
              showStock={showStock}
              setShowStock={setShowStock}
            />
          </div>

          <div className="text-end mt-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="success-light"
                id="dropdown-basic"
                className="border bg-light"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ color: '#CDAB6E', fontSize: 30 }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="">
                <Dropdown.Item className="d-flex justify-content-center">
                  Welcome!!
                </Dropdown.Item>
                <Dropdown.Item className="d-flex justify-content-center">
                  <button className="logout-button " onClick={handleClick}>
                    Logout
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
        <hr className=" my-1" />
        <ReadyReceiptsTabs showReceipt={showReceipt} />
      </div>
    </div>
  );
};

export default Navbar;
