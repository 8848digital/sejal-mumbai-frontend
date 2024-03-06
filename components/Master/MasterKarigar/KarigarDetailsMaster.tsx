import { useRouter } from 'next/router';
import React from 'react';

const KarigarDetailsMaster = () => {
  const router = useRouter();
  const { name, placeholder } = router.query;
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card mt-2 w-50">
        <div className="card-header">
          <div className="d-flex justify-content-between ">
            <button
              type="submit"
              onClick={() => router.back()}
              className=" btn btn-outline-primary mx-3 px-2 py-0 form-submit-button"
            >
              Back
            </button>
          </div>
        </div>
        <div className="my-2 p-4">
          <label htmlFor="basic-url " className="fs-5">
            {placeholder}
            <span className="text-danger">*</span>
          </label>
          <div className="input-group my-2 w-25">
            <input
              type="text"
              className="form-control py-1 ps-1"
              defaultValue={name}
              required
              id="basic-url"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarigarDetailsMaster;
