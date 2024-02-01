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
import EditDeleteButton from "@/Pages/MyPosts/EditDeleteButton.jsx";

dayjs.extend(relativeTime);

export default function FirstMyPost({post, breakpoint}) {

    const {auth} = usePage().props;

    const [editing, setEditing] = useState(false);

    const {data, setData, patch, clearErrors, reset, errors} = useForm({
        message: post.message,
    });


    return (

        <article key={post.id}
                 className="col-span-3 border-l-4 border-t-2 p-4 flex gap-4 items-start justify-between">

            {/*Image for being in left position*/}
            <div className="grow">
                <BlogImage image={post.image} className="col-span-1"/>
            </div>

            {/*Content*/}
            <div className="flex flex-col gap-4 justify-center h-full pr-8">
                {/*Title section*/}
                <div className="flex gap-x-2 items-center text-xs w-full">
                    {
                        post.category && <Category post={post}/>
                    }
                    <span className={"flex items-center"}>
               {
                   post.likes_count > 0 && `${post.likes_count} likes`
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
                            ? <p className='bg-yellow-400 text-black rounded-full text-center py-1 px-2'>published</p>
                            : <p className='bg-green-500 text-black rounded-full text-center py-1 px-2'>drafting</p>

                    }

                    {/*Dropdown menu to edit and delete*/}
                    {post.user.id === auth.user.id &&
                        <EditDeleteButton postId={post.id} breakpoint={breakpoint} />
                    }
                </div>

                {/*Blog content section*/}
                <div className="group relative">
                    <Link
                        className={"flex flex-col gap-4 "}
                        href={route('posts.show', post.id)}>
                        <p className={"text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"}>{post.title}</p>
                        <p className="leading-6 text-gray-600">{post.excerpt}</p>
                    </Link>
                </div>
            </div>

        </article>

    );
}
