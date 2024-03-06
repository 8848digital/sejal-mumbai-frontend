import React, { useState } from 'react';

const UseBarcodeTableHook = () => {
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<any>(false);
  const SalesTableInitialState: any = {
    idx: 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
    item_code: '',
    custom_gross_wt: 0,
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: 0,
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: 0,
    custom_ot_: '',
    custom_ot_amt: 0,
    custom_other: '',
    custom_amount: 0,
    warehouse: '',
  };

  const [salesTableData, setSalesTableData] = useState<any>([SalesTableInitialState]);
  const [itemList, setItemList] = useState<any>([]);
  const [selectedItemCode, setSelectedItemCode] = useState();
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  return {
    salesTableData,
    setSalesTableData,
    SalesTableInitialState,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    itemList,
    setItemList,
    selectedItemCode,
    setSelectedItemCode,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale
  };
};

export default UseBarcodeTableHook;
