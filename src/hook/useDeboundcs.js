import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            return setDebounceValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value]);
    return debounceValue;
}

export default useDebounce;
