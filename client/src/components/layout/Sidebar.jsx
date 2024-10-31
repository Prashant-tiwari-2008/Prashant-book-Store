import React from 'react';
import { Checkbox, Label, Sidebar } from 'flowbite-react';

const BookListSidebar = ({ filterConfig, filterOption, onFilterChange }) => {

    return (
        <Sidebar className='w-80 shadow-lg border-[0.76px] border-[#bfbfbf] rounded-md'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {filterConfig.map((filter) => (
                        <Sidebar.Collapse key={filter.label} label={filter.label} className='text-sm font-semibold text-gray-700'>
                            {filter.value.map((option, index) => {
                                const optionId = `${option}-${index}`;
                                const isChecked = filterOption[filter.label]?.includes(option);

                                return (
                                    <Sidebar.Item key={optionId} className="flex justify-start items-center gap-2 pl-4">
                                        <Checkbox id={optionId} className='text-center' onChange={() => onFilterChange(filter.label, option)} checked={isChecked}/>
                                        <Label htmlFor={optionId} className="ml-2 text-wrap hover:text-balance">{option}</Label>
                                    </Sidebar.Item>
                                )
                            })}
                        </Sidebar.Collapse>
                    ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
export default BookListSidebar;
