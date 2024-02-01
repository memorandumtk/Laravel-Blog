import React, {useState} from 'react';
import Dropdown from '@/Components/Dropdown.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import {useForm, usePage} from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from '@inertiajs/react'
import Avatar from "@/Components/Avatar.jsx";
import Category from "@/Components/CategoryTag.jsx";
import BlogImage from "@/Components/BlogImage.jsx";
import {AiOutlineHeart, AiOutlineLike, AiOutlineStar} from "react-icons/ai";

dayjs.extend(relativeTime);

export default function FirstPost({post}) {

    return (

        <article key={post.id}
                 className="col-span-4 border-l-4 border-t-2 p-4 flex gap-4 items-start justify-between">

            {/*Content for being in left position*/}
            <div className="flex flex-col gap-4 justify-center h-full">
                {/*Title section*/}
                <div className="flex items-center gap-x-2 text-xs">
                    {
                        post.category && <Category post={post}/>
                    }
                    <span className={"flex items-center"}>
               {
                   post.likes_count > 0 && post.likes_count
               }
                        {
                            post.liked_by_user
                                ? <AiOutlineHeart/>
                                : <AiOutlineLike/>
                        }
                </span>
                    {
                        post.created_at !== post.updated_at &&
                        <small className="text-sm text-gray-600"> edited at </small>
                    }
                    <time dateTime={post.updated_at} className="text-gray-500">
                        {dayjs(post.updated_at).format('YYYY-MM-DD')}
                    </time>
                </div>

                {/*Blog content section*/}
                <div className="group relative">
                    <Link className={"flex flex-col gap-4"}
                          href={route('posts.show', post.id)}>{post.title}
                        <p className={"text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"}>{post.title}</p>
                        <p className="leading-6 text-gray-600">{post.excerpt}</p>
                    </Link>
                </div>

                {/*User section*/}
                <div className="relative flex items-center gap-x-4">
                    <Avatar name={post.user.blog_name}/>
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            <span className="absolute inset-0"/>
                            {post.user.blog_name}
                        </p>
                        <p className="text-gray-600">{post.user.name}</p>
                    </div>
                </div>
            </div>

            {/*Image for being in right position*/}
            <div className="grow">
                <BlogImage image={post.image} className="col-span-1"/>
            </div>
        </article>

    );
}
