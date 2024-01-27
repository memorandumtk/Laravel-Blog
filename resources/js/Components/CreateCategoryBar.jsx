import React from 'react';
import {IconContext} from "react-icons";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {router, useForm} from "@inertiajs/react";

const CreateCategoryBar = () => {

    const {data, setData, post, errors,reset} = useForm({
        name: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route('categories.store'),
            {
                onSuccess: () => reset(),
            });
    }


    return (
        <form className="flex items-center h-full" onSubmit={handleSubmit}>
            <input
                id={'category-input'}
                type="text"
                value={data.name}
                placeholder="Enter new category"
                onChange={e => setData({name: e.target.value})}
                className={
                    'h-full p-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                }/>
            <button
                type='submit'
                className={
                    `items-center p-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150`
                }>
                <span>
                    Create
                </span>
            </button>
        </form>
    );
};

export default CreateCategoryBar;

