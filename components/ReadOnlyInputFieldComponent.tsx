import React from 'react';
import styles from '../styles/readyReceipts.module.css';
import { useRouter } from 'next/router';

const ReadOnlyInputFieldComponent = ({ value }: any) => {
  const { query } = useRouter();

  return (
    <input
      type="number"
      className={`table_row ${query?.hasOwnProperty('kundan')
          ? styles.input_field
          : styles.customer_sale_input_field
        } text-end border-0 bg-primary bg-opacity-10`}
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      // id={id}
      // name={id}
      readOnly
      value={value}
    // onChange={onChange}
    // onKeyDown={(e) => handleKeyDown(e, 'custom_hm_pcs')}
    // ref={inputRef}
    />
  );
};

export default ReadOnlyInputFieldComponent;
