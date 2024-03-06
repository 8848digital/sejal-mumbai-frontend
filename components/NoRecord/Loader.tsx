import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="mt-5">
        <div className="text-center mt-5">
          <Spinner />
          <div>Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
