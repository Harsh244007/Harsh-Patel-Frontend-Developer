import { useState } from "react";

const useDebouncedValue = (initialValue: string | number, delay: number) => {
  const [value, setValue] = useState(initialValue);

  let debounceTimer: ReturnType<typeof setTimeout>;

  const handleChange = (newValue: string | number) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setValue(newValue);
    }, delay);
  };

  return [value, handleChange] as const;
};
export default useDebouncedValue;
