import React from 'react';
import ReadOnlyInputFieldComponent from '../ReadOnlyInputFieldComponent';

const TotalReadOnlyRowForSales = ({ calculationRow }: any) => {
  return (
    <>
      <tr className="">
        <td className="text-center table_row py-1 " colSpan={2}>
          Total
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_gross_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_kun_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_cs_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_bb_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_other_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_net_wt.toFixed(3)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_cs.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_cs_amt.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent value={calculationRow.custom_kun_pc} />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_kun.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_kun_amt.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_ot_.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_ot_amt.toFixed(2)}
          />
        </td>
        <td className="table_row py-1">
          <ReadOnlyInputFieldComponent value={calculationRow.custom_other} />
        </td>
        <td className="table_row px-0 py-1">
          <ReadOnlyInputFieldComponent
            value={calculationRow.custom_amount.toFixed(2)}
          />
        </td>
      </tr>
    </>
  );
};

export default TotalReadOnlyRowForSales;
