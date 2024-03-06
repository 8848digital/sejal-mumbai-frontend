import React from 'react';

const BarcodeTabSection = ({ firstTabHeading, secondTabHeading }: any) => {
  return (
    <div
      className="nav nav-pills my-1 justify-content-center tab-width"
      id="pills-tab"
      role="tablist"
    >
      <div className="nav-tabs tabs-container w-50" role="presentation">
        <button
          className="nav-link w-100 border p-1"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-list"
          type="button"
          role="tab"
          aria-controls="pills-list"
          aria-selected="true"
        >
          {firstTabHeading}
        </button>
      </div>
      <div className="nav-tabs tabs-container w-50" role="presentation">
        <button
          className="nav-link active w-100 border p-1 h-100"
          id="pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-create"
          type="button"
          role="tab"
          aria-controls="pills-create"
          aria-selected="false"
        >
          {secondTabHeading}
        </button>
      </div>
    </div>
  );
};

export default BarcodeTabSection;
