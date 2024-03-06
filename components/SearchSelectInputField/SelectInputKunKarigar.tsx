import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';

const SelectInputKunKarigar = ({
  kundanKarigarData,
  defaultValue,
  tableData,
  setTableData,
  placeholderValue,
  id,
  setStateForDocStatus,
  readOnlyFields,
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
  selectedItemCodeForCustomerSale,
  setSelectedItemCodeForCustomerSale,
  fieldName,
  selectedKundanKarigarDropdownValue,
  setSelectedKundanKarigarDropdownValue,
  handleTabPressItemDetails,
}: any) => {

  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [selectedDropdownValue, setSelectedDropdownValue] = useState('')
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const dropdownRef = useRef<HTMLUListElement>(null);



  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      setKunKarigarDropdownReset(false);
      setFilterDropdownList(kundanKarigarData?.length > 0 && kundanKarigarData);
    }
  };

  useEffect(() => {
    if (
      kunKarigarDropdownReset !== undefined &&
      kunKarigarDropdownReset === true
    )
      setSelectedKundanKarigarDropdownValue('');
  }, [kunKarigarDropdownReset, setSelectedKundanKarigarDropdownValue]);

  const handleSelectedOption = (data: any, i: any) => {
    setSelectedKundanKarigarDropdownValue(data?.karigar_name);
    if (setSelectedItemCodeForCustomerSale !== undefined) {
      setSelectedItemCodeForCustomerSale({
        id: id,
        item_code: data?.karigar_name,
      });
    }

    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);
    const updatedData = tableData.map((item: any) => {

      if (item.idx === id && fieldName === 'custom_kun_karigar') {
        return { ...item, custom_kun_karigar: 0 || data?.karigar_name };
      }
      console.log('selected item code', item.idx, id);
      if (item.idx === id && fieldName === 'item_code') {

        return { ...item, item_code: data?.karigar_name };
      }
      return item;
    });
    setTableData(updatedData);
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!readOnlyFields) {
      if (e.key === 'ArrowDown' && !showDropdown) {
        e.preventDefault();
        setShowDropdown(true);
        setSelectedIndex(-1);
        setFilterDropdownList(kundanKarigarData);
      } else if (e.key === 'ArrowDown' && showDropdown) {
        setSelectedIndex((prevIndex: any) =>
          prevIndex <
            (filterDropdownList ? filterDropdownList : kundanKarigarData)
              ?.length -
            1
            ? prevIndex + 1
            : prevIndex
        );
        setScrollIndex((prevScrollIndex) =>
          Math.min(
            prevScrollIndex + 1,
            (filterDropdownList ? filterDropdownList : kundanKarigarData)
              ?.length - 1
          )
        );
      } else if (e.key === 'ArrowUp' && showDropdown) {
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
        setScrollIndex((prevScrollIndex) => Math.max(prevScrollIndex - 1, 0));
      } else if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        showDropdown &&
        selectedIndex !== -1
      ) {
        e.preventDefault();
        handleSelectedOption(filterDropdownList[selectedIndex], selectedIndex);
      } else if (
        typeof handleTabPressItemDetails === 'function' &&
        (e.key === 'Tab' || e.keyCode === 9)
      ) {
        console.log('tab pressed');
        handleTabPressItemDetails();
      }
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      // Check if the input element itself was clicked
      if (
        e?.target !== inputRef?.current &&
        !inputRef?.current?.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    const handleKeyDropdown = (e: any) => {
      // Check if a key other than arrow keys or Enter key was pressed
      if (![37, 38, 39, 40, 13].includes(e.keyCode)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDropdown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDropdown);
    };
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const selectedItem = dropdownRef.current.childNodes[
        selectedIndex
      ] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, showDropdown]);

  const handleFieldChange = (e: any) => {
    if (!readOnlyFields) {
      setShowDropdown(true);
    }
    const uppercaseValue = e.target.value.toUpperCase();
    console.log('uppercase item code', uppercaseValue);
    setSelectedKundanKarigarDropdownValue({
      id: id,
      item_code: uppercaseValue,
    });


    const query = uppercaseValue;
    const updatedFilterList: any =
      kundanKarigarData?.length > 0 &&
      kundanKarigarData.filter((item: any) => {
        return (
          item.karigar_name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1
        );
      });

    setFilterDropdownList(updatedFilterList);
    setNoRecordsFound(true);
    const updatedData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData.map((item: any) => {
        if (item.idx === id && fieldName === 'custom_kun_karigar') {
          return {
            ...item,
            custom_kun_karigar: 0 || selectedKundanKarigarDropdownValue,
          };
        }
        if (item.idx === id && fieldName === 'item_code') {
          return {
            ...item,
            item_code: 0 || uppercaseValue,
          };
        }

        return item;
      });
    setTableData(updatedData);
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
    handleKeyDown(e);
  };
  return (
    <div>
      <input
        type="text"
        name={fieldName}
        className={` ${styles.table_select}`}
        placeholder={`${placeholderValue !== undefined ? placeholderValue : 'Kundan Karigar'
          }`}
        onChange={(e) => {
          handleFieldChange(e);
        }}
        onClick={handleShowDropdown}
        value={selectedKundanKarigarDropdownValue || defaultValue}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
        readOnly={readOnlyFields}
      />
      {showDropdown && (
        <ul className=" dropdown-ul-list border-1" ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {kundanKarigarData?.length > 0 &&
                kundanKarigarData !== null &&
                kundanKarigarData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => handleSelectedOption(name, i)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''
                      }`}
                  >
                    {name.karigar_name}
                  </li>
                ))}
            </>
          ) : (
            <>
              {filterDropdownList?.length > 0 &&
                filterDropdownList !== null &&
                filterDropdownList.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => handleSelectedOption(name, i)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''
                      }`}
                  >
                    {name.karigar_name}
                  </li>
                ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectInputKunKarigar;
