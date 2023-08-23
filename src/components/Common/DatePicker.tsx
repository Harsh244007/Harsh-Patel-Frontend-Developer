import React, { useState, useEffect, useCallback } from "react";

interface DatePickerProps {
  name: string;
  value: string;
  updateValue?: boolean;
  onChange: (name: string, value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  value,
  onChange,
  updateValue = true,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSelectedValue = event.target.value;
      setSelectedValue(newSelectedValue);
      const utcDate = new Date(newSelectedValue).toISOString();
      onChange(name, utcDate);
    },
    [name, onChange]
  );

  useEffect(() => {
    if (updateValue) setSelectedValue(value);
  }, [updateValue, value]);

  return (
    <input
      type="date"
      name={name}
      value={selectedValue}
      onChange={handleDateChange}
      className="p-2 border rounded-md"
    />
  );
};

export default React.memo(DatePicker);
