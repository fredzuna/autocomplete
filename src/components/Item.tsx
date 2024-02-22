import React, { useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import IDataItem from '../interfaces/IDataItem';

interface ItemProps {
    item: IDataItem,
    focus: boolean,
    index: number,
    setCurrentFocus: React.Dispatch<React.SetStateAction<number>>
    children: React.ReactNode,
    handleSelectItem: (item: IDataItem) => void
}

export default function Item({ item, focus, index, setCurrentFocus, children, handleSelectItem }: ItemProps) {
    const ref = useRef(null);

    useEffect(() => {
        if (focus && ref.current) {
            (ref.current as HTMLInputElement).focus();            
        }
    }, [focus]);

    const handleSelect = useCallback(() => {
        handleSelectItem(item);
        setCurrentFocus(index);
    }, [item, index, setCurrentFocus]);

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
        if (event.key === 'Enter') {            
            handleSelect()
        }
    }

    return (
        <li
            tabIndex={focus ? 0 : -1}
            ref={ref}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
        >
            {children}
        </li>
    );
}
