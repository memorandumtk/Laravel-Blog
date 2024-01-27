import {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function imageUrl(name, color) {
    return 'https://ui-avatars.com/api/?name=' + name + '&background=random';
}

const colorVariants = {
    orange: 'bg-orange-600 hover:bg-orange-500 text-white',
    pink: 'bg-pink-500 hover:bg-pink-400 text-white',
    green: 'bg-green-500 hover:bg-green-400 text-white',
    sky: 'bg-green-500 hover:bg-green-400 text-white',
    indigo: 'bg-green-500 hover:bg-green-400 text-white',
    yellow: 'bg-yellow-300 hover:bg-yellow-400 text-white',
    white: 'bg-white text-black',
}

const CategorySelect = ({categories, handleCategoryChange, categoryId = 0}) => {

    const [selected, setSelected] = useState(categories[categoryId])

    const handleChange = (category) => {
        setSelected(category);
        handleCategoryChange({
            target: { value: category.id }
        }); // Propagate the change
    }

    return (
        <Listbox value={selected} onChange={handleChange}>
            {({open}) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Select Category
                    </Listbox.Label>
                    <div className="relative">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                              <span className={`rounded-full h-4 w-4 ${colorVariants[selected.color]}`} />
                            <span className="grow ml-3 block truncate">{selected.name}</span>
                          </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                                {categories.map((category) => (
                                    <Listbox.Option
                                        key={category.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={category}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`rounded-full h-4 w-4 ${colorVariants[category.color]}`}/>
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {category.name}
                                                      </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                      </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default CategorySelect;
