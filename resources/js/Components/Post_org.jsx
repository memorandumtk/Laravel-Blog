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
import {AiOutlineLike} from "react-icons/ai";

dayjs.extend(relativeTime);

export default function Post({post}) {

    const color = post.liked_by_user ? "red" : "";

    return (
        <div className={`p-6 flex flex-col space-x-2 gap-2`}>
            {/*Person section*/}
            <div className="flex gap-2">
                <Avatar post={post}/>
                <span className="text-gray-800">{post.user.name}</span>
            </div>

            {/*Blog*/}
            <div className="flex flex-col gap-4">
                {/*Blog title section*/}
                <div className="flex">
                    <Link className={"text-lg flex-1 hover:text-indigo-700"}
                          href={route('posts.show', post.id)}>{post.title}</Link>
                    <div className="flex justify-end gap-6 items-center">
                        <small className="ml-2 text-sm text-gray-600">{dayjs(post.created_at).fromNow() + " posted"}</small>
                        {
                            post.created_at !== post.updated_at &&
                            <small className="text-sm text-gray-600"> &middot; edited</small>
                        }
                        <span className={"flex items-center"}>
                        {
                            (post.likes_count && post.likes_count) !== 0 &&
                            <strong className="">{post.likes_count}</strong>
                        }
                            <AiOutlineLike color={color}></AiOutlineLike>
                        </span>
                        {
                            post.category
                                ? <Category post={post}/>
                                : <span>No category</span>
                        }
                    </div>
                </div>
                {/*Blog content section*/}
                <div className="grid grid-cols-4 gap-4">
                    <BlogImage className="col-span-1"/>
                    <p className="col-span-3 text-lg text-gray-900">{post.excerpt}</p>
                </div>
            </div>
        </div>
    )
        ;
}
