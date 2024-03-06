import React from 'react';

const DailyStatusReportHeading = () => {
  return (
    <thead>
      <tr className="row">
        <th colSpan={2} scope="colgroup" className="thead col-sm-3"></th>
        <th colSpan={3} scope="colgroup" className="thead col-sm-3">
          Jama
        </th>
        <th colSpan={3} scope="colgroup" className="thead col-sm-3">
          Nama
        </th>
      </tr>
      <tr className="row">
        {/* thead bg-primary bg-opacity-50 text-dark */}
        <th scope="col" className="thead col-sm-1 ">
          Sr.No.
        </th>
        <th scope="col" className="thead col-sm-2 ">
          Name
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Net Wt
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Gross Wt
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Pcs
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Net Wt
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Gross Wt
        </th>
        <th scope="col" className="thead col-sm-1 ">
          Pcs
        </th>
      </tr>
    </thead>
  );
};

export default DailyStatusReportHeading;
