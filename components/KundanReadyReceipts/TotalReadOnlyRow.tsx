import React from 'react';
import ReadOnlyInputFieldComponent from '../ReadOnlyInputFieldComponent';

const TotalReadOnlyRow = ({ calculationRow }: any) => {
  return (
    <>
      <tr className="">
        <td className="text-center table_row py-1" colSpan={3}>
          Total
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_net_wt).toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_few_wt).toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_mat_wt).toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_gross_wt).toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent value={calculationRow?.custom_pcs} />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_other).toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={Number(calculationRow?.custom_total).toFixed(2)}
          />
        </td>

        {/* <td className="table_row px-0">
          <ReadOnlyInputFieldComponent value={''} />
        </td> */}
      </tr>
    </>
  );
};

export default TotalReadOnlyRow;
