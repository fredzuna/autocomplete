import { useCallback, useEffect, useState } from "react";

export default function useItemFocus(size: number) {
    const [currentFocus, setCurrentFocus] = useState(-1);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {            
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
                    break;
                default:
                    break;
            }
        },
        [size, currentFocus, setCurrentFocus]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return [currentFocus, setCurrentFocus];
}

