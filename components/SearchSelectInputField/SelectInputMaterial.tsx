import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';

const SelectInputMaterial = ({
  materialListData,
  materialWeight,
  setMaterialWeight,
  defaultValue,
  id,
  setSelectedMaterial,
  selectedMaterial,
  readOnlyFields,
  style,
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const HandleSelectInputField = (e: any) => {
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    const query = e.target.value;

    const UpdatedFilterList: any = materialListData?.filter((item: any) => {
      return item.material?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
    });
    setFilterDropdownList(UpdatedFilterList);
    setNoRecordsFound(true);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        console.log(item, 'modalItem');
        if (i === id) {
          return { ...item, material: 0 || selectedDropdownValue };
        }
        return item;
      });
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(query);
  };

  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      setFilterDropdownList(materialListData);
    }
  };
  const handleKeyDown = (e: any) => {
    if (!readOnlyFields) {
      if (e.key === 'ArrowDown' && !showDropdown) {
        e.preventDefault();
        setShowDropdown(true);
        setSelectedIndex(-1);
        setFilterDropdownList(materialListData);
      } else if (e.key === 'ArrowDown' && showDropdown) {
        setSelectedIndex((prevIndex: any) =>
          prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === 'ArrowUp' && showDropdown) {
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        showDropdown &&
        selectedIndex !== -1
      ) {
        e.preventDefault();
        HandleMaterialAbbr(filterDropdownList[selectedIndex]);
      }
    }
  };
  const HandleAbbrKey = (e: any) => {
    if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      showDropdown &&
      selectedIndex !== -1
    ) {
      e.preventDefault();
      handleSelectedOption(filterDropdownList[selectedIndex]);
    }
  };

  const handleSelectedOption = (data: any) => {
    setSelectedDropdownValue(data.material);
    setShowDropdown(false);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, material: 0 || data?.material };
        }
        return item;
      });
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(data);
  };
  const HandleMaterialAbbr = (name: any) => {
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, index: any) => {
        if (index === id) {
          return { ...item, material_abbr: 0 || name?.material_abbr };
        }
        return item;
      });
    setMaterialWeight(updatedModalData);
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

  return (
    <div className="dropdown-wrapper">
      <input
        type="text"
        name="material"
        className={` ${styles.table_select} `}
        id="exampleInputEmail1"
        placeholder="Material Name"
        onChange={(e) => {
          HandleSelectInputField(e);
          handleKeyDown(e);
        }}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        // defaultValue={materialListData?.karigar_name}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        onKeyUp={HandleAbbrKey}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className={`dropdown-ul-list border `} ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {materialListData?.length > 0 &&
                materialListData !== null &&
                materialListData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={(e) => {
                      handleSelectedOption(name);
                    }}
                    onMouseDown={() => HandleMaterialAbbr(name)}
                    // onKeyDown={(e)=>HandleAbbrKey(e)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''
                      }`}
                  >
                    {name.material}
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
                    onClick={(e) => {
                      handleSelectedOption(name);
                    }}
                    // onKeyDown={(e)=>HandleAbbrKey(e)}
                    onMouseDown={() => HandleMaterialAbbr(name)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''
                      }`}
                  >
                    {name.material}
                  </li>
                ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};
export default SelectInputMaterial;
