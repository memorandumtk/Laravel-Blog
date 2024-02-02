import React from 'react';
import {Link} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";

const EditDeleteButton = ({postId, breakpoint}) => {

    return (
        <div className={"flex justify-end flex-1 gap-4 pr-4"}>
            {(breakpoint >= 3)
                ?
                <div className="flex gap-8">
                    <Link as="button" href={route('my-posts.edit', postId)} method="get"
                          className="underline">
                        Edit
                    </Link>
                    <Link as="button" href={route('my-posts.destroy', postId)}
                          method="delete" className="underline">
                        Delete
                    </Link>
                </div>
                :
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link as="button" href={route('my-posts.edit', postId)} method="get">
                                Edit
                            </Dropdown.Link>
                            <Dropdown.Link as="button" href={route('my-posts.destroy', postId)}
                                           method="delete">
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            }
        </div>
    );
};

export default EditDeleteButton;
