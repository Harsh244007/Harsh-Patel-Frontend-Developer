import { DropdownProps } from "../../configs/types/Types";

const Dropdown: React.FC<DropdownProps> = ({ name, onChange, options }) => {
  return (
    <select
      name={name}
      key={name}
      onChange={onChange}
      className="p-2 border rounded-md"
    >
      <option value="">Select {name}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
export { Dropdown };
