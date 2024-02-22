import React, {  } from 'react';

interface IProps {
    filterText: string;
    handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fetchData: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
    handleClear: () => void

}

export default function Input(props: IProps) {
    const { filterText, handleFilter, fetchData, inputRef, handleClear } = props
    return (
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
    )
}