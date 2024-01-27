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

export default function Post({post}) {

    return (

        <article key={post.id}
                 className="border-l-4 border-t-2 p-4 flex max-w-xl flex-col gap-4 items-start justify-between">

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
                <Link className={"mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-400"}
                      href={route('posts.show', post.id)}>{post.title}
                    <div className="pt-4 grid grid-cols-4 justify-center items-center gap-x-4">
                        <BlogImage image={post.image} className="col-span-1"/>
                        <p className="col-span-3 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                    </div>
                </Link>
            </div>

            {/*User section*/}
            <div className="relative flex items-center gap-x-4">
                <Avatar post={post}/>
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0"/>
                        {post.user.blog_name}
                    </p>
                    <p className="text-gray-600">{post.user.name}</p>
                </div>
            </div>
        </article>

    );
}
