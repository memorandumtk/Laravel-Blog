import React from 'react';
import SearchBar from "@/Components/SearchBar.jsx";

const Header = ({children, title, subtitle = null}) => {
    return (
        <div className="border border-t bg-white shadow py-4 lg:py-6 px-12 lg:px-48 flex flex-col gap-2 lg:flex-row items-center">
            <div className="flex-1 flex flex-col">
                {/*<h1 className="text-3xl font-bold tracking-tight text-gray-900 ">{title}</h1>*/}
                <h2 className="self-center lg:self-start italic text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
                <p className="italic mt-2 leading-8 text-gray-600">
                    {subtitle}
                </p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Header;
