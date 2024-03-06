import React, { useState } from 'react';

const CurrentDate = ({ defaultKarigarData, defaultSalesDate }: any) => {
  const formatDate = (inputDate: Date) => {
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    return formattedDate.replace(/\//g, '-');
  };

  const getDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  const [currentDate, setCurrentDate] = useState(getDate());

  const CurrentDateValue: any = () => {
    if (defaultKarigarData !== undefined && defaultKarigarData.length > 0) {
      const postingDate = new Date(defaultKarigarData[0]?.posting_date);
      return formatDate(postingDate);
    } else if (defaultSalesDate !== undefined) {
      const postingDateForSales = new Date(defaultSalesDate);
      return formatDate(postingDateForSales);
    } else {
      return currentDate;
    }
  };

  return (
    <input
      type="text border border-secondary"
      className="form-control input-sm border-secondary"
      value={CurrentDateValue()}
      readOnly
      disabled
    />
  );
};

export default CurrentDate;
