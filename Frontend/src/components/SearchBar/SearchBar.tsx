"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { filterAtom } from "@/utils/atoms";
import { getNextDay, getToday, updateSearchParams } from "@/utils/helpers";
import { today, tomorrow } from "@/utils/constants";
import { DateInputProps } from "@/types";

const DateInput: React.FC<DateInputProps> = ({
  name,
  value,
  min,
  onChange,
  placeholder,
}) => (
  <div className="searchbar__item">
    <CalendarDaysIcon
      height={25}
      width={25}
      className="absolute w-[20px] h-[20px] ml-4"
    />
    <input
      type="date"
      name={name}
      value={value}
      min={min}
      onChange={onChange}
      placeholder={placeholder}
      className="searchbar__input"
    />
  </div>
);

const SearchBar: React.FC = () => {
  const [filters, setFilters] = useAtom(filterAtom);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newPathName = updateSearchParams(filters);
    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <DateInput
        name="startDate"
        value={filters.startDate ?? getToday()}
        min={today}
        onChange={handleInputChange}
        placeholder="Start Date"
      />
      <DateInput
        name="endDate"
        value={filters.endDate ?? getNextDay()}
        min={tomorrow}
        onChange={handleInputChange}
        placeholder="End Date"
      />
      <button
        type="submit"
        className="btn btn-primary text-white md:rounded-r-full"
      >
        Search
        <MagnifyingGlassIcon
          height={17}
          width={17}
          className="object-contain"
        />
      </button>
    </form>
  );
};

export default SearchBar;
