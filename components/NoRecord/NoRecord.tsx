import Image from 'next/image';
import React from 'react';
import noRecordImg from '../../public/assets/no-record.png';
import { useRouter } from 'next/router';

const NoRecord = ({ title, content, backButtonUrl, HandleRefresh }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <h2 className='text-center'>{title}</h2>
          <div className="text-center">
            <Image
              src={noRecordImg}
              width={200}
              height={200}
              alt="Picture of no record"
              className="text-center"
            />
          </div>
          <p className='text-center'>{content}</p>
          <div className="text-center">
            {backButtonUrl ? (
              <button
                type="button"
                onClick={() => router?.push(backButtonUrl)}
                className="btn btn-primary px-2"
              >
                Go Back
              </button>
            ) : (
              // <button
              //   type="button"
              //   onClick={HandleRefresh}
              //   className="btn btn-primary px-2"
              // >
              //   Refresh
              // </button>
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecord;
