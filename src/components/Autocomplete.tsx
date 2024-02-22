import React, { useState, useEffect, useRef } from 'react';
import IDataItem from '../interfaces/IDataItem';
import apiService from '../api/apiService';
import HighlightedText from './HighlightedText';
import useDebounce from '../hooks/useDebounce';
import Loader from './Loader';

export default function Autocomplete() {
    const [filterText, setFilterText] = useState<string>("");
    const [data, setData] = useState<IDataItem[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState<IDataItem>();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedFilterText = useDebounce(filterText, 300);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value)
    }

    const fetchData = async () => {
        if (!showOptions) {
            setIsLoading(true)
            const data = await apiService.getData();
            setData(data)
            setShowOptions(true)
            setIsLoading(false)
        }
    }

    const handleSelectItem = (item: IDataItem) => {
        setFilterText(item.name)
        setSelectedValue(item)
        setShowOptions(false);
    }

    const restorePreviousValue = (selectedValue?: IDataItem) => {
        if (selectedValue) {
            setFilterText(selectedValue.name)
        }

        setShowOptions(false);
    }

    const handleClear = () => {
        setFilterText('')
        setSelectedValue(undefined)
        inputRef.current?.focus()
    }

    useEffect(() => {
        const handleFilterChange = async (debouncedFilterText: string) => {
            try {
                if (showOptions) {
                    setIsLoading(true)
                    const filteredData = await apiService.filterData(debouncedFilterText);
                    setData(filteredData);
                    setIsLoading(false)
                }

            } catch (error) {
                console.error('Error filtering data:', error);
            }
        };

        handleFilterChange(debouncedFilterText);
    }, [debouncedFilterText]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                restorePreviousValue(selectedValue)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedValue]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    break;
                case 'Escape':
                    // Close the options
                    restorePreviousValue(selectedValue);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedValue]);

    return (
        <div
            ref={containerRef}
            className='autocomplete'
        >
            <div className='input-container'>
                <input
                    className='filter-text'
                    type="text"
                    value={filterText}
                    onChange={handleFilter}
                    placeholder="Filter data..."
                    onFocus={fetchData}
                    ref={inputRef}
                />
                {filterText.length > 0 &&
                    <span
                        className='clear-icon'
                        onClick={handleClear}
                    >X</span>
                }
            </div>
            <div className='container'>
                {isLoading === true ?
                    <Loader />
                    :
                    (showOptions &&
                        <ul className='container-items'>
                            {data.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item)}
                                    tabIndex={item.id}
                                >
                                    <HighlightedText item={item} filterText={filterText} />
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    )
}