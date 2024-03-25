"use client";
import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

type Props = {
  options: { label: string }[];
  onChange?: (vl: { label: string }) => Promise<void>;
};

export default function SelectBox({ options, onChange }: Props) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    onChange(selected)
  }, [selected])

  return (
    <div className="select-box">
      <Listbox value={selected} onChange={setSelected}>
        <div>
          <Listbox.Button className="select-box">
            <span>{selected.label}</span>
            <span>
              <IconChevronDown aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) => ` ${active ? "active" : ""}`}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={` ${selected ? "selected" : ""}`}>
                        {option.label}
                      </span>
                    </>
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
