import React from 'react';
import {Link} from "@inertiajs/react";
import parse from "html-react-parser";

const Pagination = ({links}) => {

    function getClassName(active) {
        if (active) {
            return "px-4 py-3 text-sm leading-4 border rounded hover:bg-slate-300 focus:border-primary focus:text-primary bg-blue-300 text-white";
        } else {
            return "px-4 py-3 text-sm leading-4 border rounded hover:bg-slate-300 focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 1 && (
            <div className="flex flex-wrap gap-1">
                {links.map((link, key) => (
                    link.url === null ?
                        (<div
                            className="px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                            key={key}
                        >{parse(link.label)}</div>) :

                        (<Link
                            className={getClassName(link.active)}
                            href={link.url}
                            key={key}
                        >{parse(link.label)}</Link>)
                ))}
            </div>
        )
    );
};

export default Pagination;
