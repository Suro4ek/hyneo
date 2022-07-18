import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {HiSelector} from "react-icons/hi";
import {AiOutlineCheck} from "react-icons/ai";


const ListBox = ({lists, def, name_value}) => {
    const [selected, setSelected] = useState(def)
    return(
        <>
            <input type={"hidden"} value={selected === null ? "" : selected.id} name={name_value}/>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="bg-gray-50 border border-gray-300 py-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <span className="block truncate">{selected === null ? "" : selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {lists.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 bg-gray-50 dark:bg-gray-700 ${
                                            active ? ' text-amber-900' : 'text-white'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {person.name}
                      </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    )
}

export default ListBox;