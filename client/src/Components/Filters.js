import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {
  LanguageData,
  YearData,
} from "../Data/FilterData";


function Filters(props) {
  const {
    categories,
    category,
    setCategory,
    language,
    setLanguage,
    year,
    setYear,
  } = props?.data;

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "Усі об'єкти" }, ...categories]
          : [{ title: "О'бєкта не знайдено" }],
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguageData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-mainText border-main grid md:grid-cols-3 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      { Filter.map((item, index) => (
        <Listbox key={ index } value={ item.value } onChange={ item.onChange }>
          <div className="relative">
            <Listbox.Button className="relative w-full text-mainText bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{ item.value.title }</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={ Fragment }
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-mainText border hover:text-main text-mainText rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                { item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={ i }
                    className={ ({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-subMain text-main" : "text-main"
                      }`
                    }
                    value={ iterm }
                  >
                    { ({ selected }) => (
                      <>
                        <span
                          className={ `block truncated ${selected ? "font-semibold" : "font-normal"
                            }` }
                        >
                          { iterm.title }
                        </span>
                        { selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null }
                      </>
                    ) }
                  </Listbox.Option>
                )) }
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )) }
    </div>
  );
}

export default Filters;
