import React, { useState, useEffect, useRef } from 'react';
import IDataItem from '../interfaces/IDataItem';
import apiService from '../api/apiService';
import useDebounce from '../hooks/useDebounce';
import Loader from './Loader';
import List from './List';
import Input from './Input';

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

    return (
        <div
            ref={containerRef}
            className='autocomplete'
        >
            <Input
                filterText={filterText}
                fetchData={fetchData}
                handleFilter={handleFilter}
                inputRef={inputRef}
                handleClear={handleClear}

            />
            <div className='container'>
                {isLoading === true ?
                    <Loader />
                    :
                    (showOptions &&
                        <List
                            data={data}
                            handleSelectItem={handleSelectItem}
                            filterText={filterText}
                        />
                    )
                }
            </div>
        </div>
    )
}