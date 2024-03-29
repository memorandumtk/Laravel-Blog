import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {FaMagnifyingGlass} from "react-icons/fa6";
import {IconContext} from "react-icons";

import {router} from '@inertiajs/react'

const SearchBar = ({isMyPost}) => {
    const [searchString, setSearchString] = useState({
        'search': '',
    });

    const handleInputChange = (e) => {
        setSearchString({
            'search': e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        isMyPost
            ?
            router.get(route('my-posts.index') + '?search=' + searchString.search)
            :
            router.get(route('posts.index') + '?search=' + searchString.search)
    }

    return (
        <form className="flex items-center h-full" onSubmit={handleSubmit}>
            <input
                id={'searchInput'}
                type="text"
                value={searchString.search}
                onChange={handleInputChange}
                placeholder="Enter some words..."
                className={
                    'h-full p-2 border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 rounded-md shadow-sm'
                }/>
            <button
                type='submit'
                className={
                    `h-full inline-flex items-center p-2 bg-white border border-gray-300 rounded-md text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 disabled:opacity-25 transition ease-in-out duration-150`
                }>
                <IconContext.Provider value={{color: "gray", className: "global-class-name"}}>
                    <div>
                        <FaMagnifyingGlass/>
                    </div>
                </IconContext.Provider>
            </button>
        </form>
    );
};
export default SearchBar;
