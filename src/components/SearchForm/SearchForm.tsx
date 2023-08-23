import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchData,
} from "../../configs/store/spaceXSlice";
import { FilterOptions } from "../../configs/types/Types";
import {
  capsuleStatusOptions,
  capsuleTypeOptions,
} from "../../configs/JSON/DropDownOption";
import { Dropdown } from "../Common/DropDown";
import DatePicker from "../Common/DatePicker";
const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<FilterOptions>({
    status: "",
    original_launch: "",
    type: "",
  });

  useEffect(() => {
    {/* @ts-ignore  for vercel deployment*/}               
    dispatch(fetchData(filters));
  }, [filters, dispatch]);

  let debounceTimer: ReturnType<typeof setTimeout>;
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }, 500);
  };
  const handleFilterChangeLaunch = (name: string, value: string) => {
    console.log(name, value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }, 500);
  };

  const handleTodayButtonClick = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        original_launch: "",
      }));
    }, 500);
  };

  return (
    <div className="flex flex-wrap justify-evenly items-center bg-gray-200 p-4">
        {/* @ts-ignore  for vercel deployment*/}
        <Dropdown name="status" onChange={handleFilterChange}
        options={capsuleStatusOptions}
        />
        {/* @ts-ignore  for vercel deployment*/}  
      <Dropdown name="type" onChange={handleFilterChange}
        options={capsuleTypeOptions}
      />

      <DatePicker
        name="original_launch"
        value={filters.original_launch}
        updateValue={filters.original_launch !== "" ? false : true}
        onChange={handleFilterChangeLaunch}
      />
      {filters.original_launch !== "" && (
        <button
          onClick={handleTodayButtonClick}
          className="p-2 border rounded-md"
        >
          Go to Today
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchForm);
