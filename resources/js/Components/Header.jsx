import React from 'react';
import SearchBar from "@/Components/SearchBar.jsx";

const Header = ({children, title, subtitle = null}) => {
    return (
            <div className="border border-t bg-white shadow py-6 px-12 flex items-center">
                <div className="flex-1">
                    {/*<h1 className="text-3xl font-bold tracking-tight text-gray-900 ">{title}</h1>*/}
                    <h2 className="italic text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
                    <p className="italic mt-2 leading-8 text-gray-600">
                        {subtitle}
                    </p>
                </div>
                {children}
            </div>
    );
};

export default Header;
