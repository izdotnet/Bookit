"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { filterAtom } from "@/utils/atoms";

function CustomFilter({ title, options }: CustomFilterProps) {
  const [selected, setSelected] = React.useState(options[0]);
  const [filters, setFilters] = useAtom(filterAtom);
  const router = useRouter();

  const handleUpdateParams = (e: { title: string; value: string }) => {
    // const newPathName = updateSearchParams(title, e.value.toLowerCase());
    // router.push(newPathName);
    setFilters({ ...filters, [title]: e.value });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <ChevronUpDownIcon className="w-5 h-5 ml-4 object-contain" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default CustomFilter;
