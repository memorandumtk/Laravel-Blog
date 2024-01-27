import React, {useState} from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, usePage} from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from '@inertiajs/react'
import Avatar from "@/Components/Avatar.jsx";
import Category from "@/Components/CategoryTag.jsx";
import BlogImage from "@/Components/BlogImage.jsx";
import {AiOutlineHeart, AiOutlineLike, AiOutlineStar} from "react-icons/ai";

dayjs.extend(relativeTime);

export default function MyPost({post}) {

    const {auth} = usePage().props;

    const [editing, setEditing] = useState(false);

    const {data, setData, patch, clearErrors, reset, errors} = useForm({
        message: post.message,
    });


    return (

        <article key={post.id}
                 className="border-l-4 border-t-2 p-4 flex max-w-xl flex-col gap-4 items-start justify-between">

            {/*Title section*/}
            <div className="flex gap-x-2 items-center text-xs w-full">
                {
                    post.category && <Category post={post}/>
                }
                <span className={"flex items-center"}>
               {
                   post.likes_count > 0 && post.likes_count
               }
                </span>
                {
                    post.created_at !== post.updated_at &&
                    <small className="text-sm text-gray-600"> edited at </small>
                }
                <time dateTime={post.updated_at} className="text-gray-500">
                    {dayjs(post.updated_at).format('YYYY-MM-DD')}
                </time>
                {
                    post.published
                        ?<p className='bg-yellow-400 text-black rounded-full text-center py-1 px-2'>published</p>
                        :<p className='bg-green-500 text-black rounded-full text-center py-1 px-2'>drafting</p>

                }

                {/*Dropdown menu to edit and delete*/}
                {post.user.id === auth.user.id &&
                    <div className="flex-1 flex justify-end pr-4 items-center">
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
                                <Dropdown.Link as="button" href={route('my-posts.edit', post.id)} method="get">
                                    Edit
                                </Dropdown.Link>
                                <Dropdown.Link as="button" href={route('my-posts.destroy', post.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                }
            </div>

            {/*Blog content section*/}
            <div className="group relative">
                <Link className={"mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"}
                      href={route('posts.show', post.id)}>{post.title}
                    <div className="pt-4 grid grid-cols-4 justify-center items-center gap-x-4">
                        <BlogImage image={post.image} className="col-span-1"/>
                        <p className="col-span-3 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                    </div>
                </Link>
            </div>

        </article>

    );
}
