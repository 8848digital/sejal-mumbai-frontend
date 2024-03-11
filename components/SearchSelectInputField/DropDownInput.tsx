// DropdownInput.js
import React, { useEffect, useRef, useState } from 'react';

const DropdownInput = ({
  dropdownData,
  inputValue,
  setInputValue,
  disabled,
  width,
  updateKey,
  onSelect,
}: any) => {
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<any>(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    setFilteredData([...dropdownData]);
  }, [dropdownData]);

  const scrollIntoView = () => {
    if (selectedIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'auto', block: 'nearest' });
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
        setDropdownVisible(false);
      }
    };
    const handleKeyDropdown = (e: any) => {
      // Check if a key other than arrow keys or Enter key was pressed
      if (![37, 38, 39, 40, 13].includes(e.keyCode)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDropdown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDropdown);
    };
  }, []);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '' || !value || value?.length === 0) {
      setFilteredData([...dropdownData]);
    } else {
      const filtered = dropdownData.filter((item: any) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered.length > 0 ? filtered : ['Data Not Found']);
      setSelectedIndex(-1);
    }
  };

  const handleOnFocus = () => {
    setDropdownVisible(true);
  };

  const handleInputClick = () => {
    setDropdownVisible(true);
  };

  const handleKeyDown = (e: any) => {
    if (filteredData.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
        );
        scrollIntoView();
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
        scrollIntoView();
        break;
      case 'Enter':
        if (selectedIndex !== -1) {
          handleSelect(filteredData[selectedIndex]);
        }
        break;
      case 'Tab':
        setDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (value: any) => {
    setInputValue(value);
    setDropdownVisible(false);
    setSelectedIndex(-1);
    onSelect(value);
  };

  const handleInputClear = () => {
    setInputValue('');
    setDropdownVisible(true);
    setSelectedIndex(-1);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (inputRef.current?.value === '') {
        handleInputClear();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control position-relative"
        style={{ width }}
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onKeyUp={handleKeyUp}
        placeholder="Search..."
        ref={inputRef}
        disabled={disabled}
      />
      {dropdownVisible && (
        <div
          className="dropdown dropdown-container border position-absolute bg-white"
          style={{
            width: inputRef.current?.offsetWidth,
            height: '175px',
            overflowY: 'scroll',
          }}
          ref={dropdownRef}
        >
          {filteredData?.length > 0 && (
            <>
              {filteredData?.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={` ${
                    selectedIndex === index ? 'selected bg-info text-white' : ''
                  }`}
                  style={{
                    cursor: 'pointer',
                    padding: '7px',
                    textAlign: 'start',
                    color: '#000',
                    fontSize: '12px',
                  }}
                >
                  {item}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
