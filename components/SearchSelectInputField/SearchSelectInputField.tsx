import React, { useEffect, useRef, useState } from 'react';

const SearchSelectInputField = ({
  karigarData,
  recipitData,
  setRecipitData,
  defaultValue,
  selectedDropdownValue,
  setSelectedDropdownValue,
  setStateForDocStatus,
  placeholder,
  className,
  readOnlyFields,
  style,
  clientGroupList,
  handleSelectClientGroup,
  name,
  selectDropDownReset,
  setSelectDropDownReset,
}: any) => {
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [showClientGroupSelect, setShowClientGroupSelect] = useState(false);

  console.log(defaultValue, 'karigar data in search');
  useEffect(() => {
    if (selectDropDownReset !== undefined && selectDropDownReset === true)
      setSelectedDropdownValue('');
  }, [selectDropDownReset, setSelectedDropdownValue]);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      // Check if the input element itself or the client group select dropdown was clicked
      const isSelectClicked =
        e.target.tagName === 'SELECT' &&
        e.target.classList.contains('form-select');

      if (
        e?.target !== inputRef?.current &&
        !inputRef?.current?.contains(e.target) &&
        !dropdownRef?.current?.contains(e.target) &&
        !isSelectClicked
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

    const handleClientGroupDropdownClick = (e: any) => {
      // Stop event propagation for client group dropdown
      e.stopPropagation();
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDropdown);

    document
      .querySelector('.form-select.form-select-sm.border')
      ?.addEventListener('click', handleClientGroupDropdownClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document
        .querySelector('.form-select.form-select-sm.border')
        ?.removeEventListener('click', handleClientGroupDropdownClick);
      document.removeEventListener('keydown', handleKeyDropdown);
    };
  }, [inputRef]);

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

  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      setFilterDropdownList(karigarData?.length > 0 && karigarData);
      // setSelectDropDownReset(false);
    }
  };

  const handleSelectedOption = (data: any, i: any) => {
    setSelectedDropdownValue(data?.karigar_name);
    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);

    if (setRecipitData !== undefined && name === 'custom_karigar') {
      setRecipitData({ ...recipitData, custom_karigar: data?.karigar_name });
    }
    if (setRecipitData !== undefined && name === 'store_location') {
      setRecipitData({
        ...recipitData,
        store_location: selectedDropdownValue,
      });
    }

    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  const handleDocumentClick = (e: any) => {
    if (
      e?.target !== inputRef?.current &&
      !inputRef?.current?.contains(e?.target)
    ) {
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!readOnlyFields) {
      if (e.key === 'ArrowDown' && !showDropdown) {
        e.preventDefault();
        setShowDropdown(true);
        setSelectedIndex(-1);
      } else if (e.key === 'ArrowDown' && showDropdown) {
        setSelectedIndex((prevIndex: any) =>
          prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
        );
        setScrollIndex((prevScrollIndex) =>
          Math.min(prevScrollIndex + 1, filterDropdownList?.length - 1)
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
      }
    }
  };
  const handleFieldChange = (e: any) => {
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    const query = e.target.value;
    const updatedFilterList: any =
      karigarData?.length > 0 &&
      karigarData.filter((item: any) => {
        return (
          item.karigar_name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1
        );
      });

    setFilterDropdownList(updatedFilterList);
    setNoRecordsFound(true);

    if (setRecipitData !== undefined && name === 'custom_karigar') {
      setRecipitData({
        ...recipitData,
        custom_karigar: selectedDropdownValue,
      });
    }
    if (setRecipitData !== undefined && name === 'store_location') {
      setRecipitData({
        ...recipitData,
        store_location: selectedDropdownValue,
      });
    }

    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }

    handleKeyDown(e);
  };

  const handleShowClientGroupSelect = (
    e: React.MouseEvent<HTMLSelectElement>
  ) => {
    e.stopPropagation(); // Stop event propagation
    setShowClientGroupSelect(!showClientGroupSelect);
    setShowDropdown(true);
  };

  const HandleClientBlur = () => {
    if (!document.activeElement?.classList.contains('form-select')) {
      if (filterDropdownList?.length === 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
  };

  return (
    <>
      <div className="position-relative">
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          onBlur={HandleClientBlur}
          onChange={(e) => handleFieldChange(e)}
          onClick={handleDocumentClick}
          onMouseDown={handleShowDropdown}
          value={selectedDropdownValue}
          defaultValue={defaultValue}
          readOnly={readOnlyFields}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          ref={inputRef}
        />
        {showDropdown && (
          <ul className={`dropdown-ul-list ${style}`} ref={dropdownRef}>
            {noRecords === false && filterDropdownList?.length === 0 ? (
              <>
                {karigarData?.length > 0 &&
                  karigarData !== null &&
                  karigarData.map((list: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => handleSelectedOption(list, index)}
                      className="dropdown-list"
                    >
                      {list.karigar_name}
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
                      onMouseDown={(e) => {
                        handleSelectedOption(name, i);
                      }}
                      className={`dropdown-list ${
                        i === selectedIndex ? 'selected' : ''
                      }`}
                    >
                      {name.karigar_name}
                    </li>
                  ))}
              </>
            )}
            {clientGroupList?.length > 0 && (
              <>
                {noRecords === true && filterDropdownList?.length === 0 && (
                  <>
                    <div className="text-small px-2 mt-1">Client Group</div>
                    <li className="dropdown-list p-1">
                      <select
                        className="form-select form-select-sm border"
                        aria-label="Default select example"
                        onClick={(e) => {
                          e.stopPropagation(); // Stop event propagation
                          handleShowClientGroupSelect(e);
                        }}
                        onChange={(e) => {
                          handleSelectClientGroup(e.target.value);
                          setSelectedDropdownValue(selectedDropdownValue);
                        }}
                      >
                        <option>Select client group</option>
                        {clientGroupList?.length > 0 &&
                          clientGroupList !== null &&
                          clientGroupList.map((data: any, index: any) => (
                            <option key={index}>{data.client_group}</option>
                          ))}
                      </select>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchSelectInputField;
