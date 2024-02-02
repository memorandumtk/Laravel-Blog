import React from 'react';
import Post from "@/Pages/Posts/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import {useForm, Head, router} from '@inertiajs/react';
import BlogImage from "@/Components/BlogImage.jsx";
import DetailOfComment from "@/Pages/Detail/DetailOfComment.jsx";
import DetailBackground from "@/Pages/Detail/DetailBackground.jsx";
import dayjs from "dayjs";
import Category from "@/Components/CategoryTag.jsx";
import LikeButton from "@/Components/LikeButton.jsx";
import {AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import CategoryTag from "@/Components/CategoryTag.jsx";

const Detail = ({auth, post, comments}) => {

    console.log((post))

    return (
        <AuthenticatedLayout user={auth.user}>

            <div className="relative isolate overflow-hidden bg-white px-6 py-12 lg:overflow-visible">

                {/*Background & Style section*/}
                <DetailBackground/>

                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">

                    {/*Sentence section*/}
                    <div
                        className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:max-w-lg">
                            {
                                post.category && <CategoryTag post={post}/>
                            }
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {post.title}
                            </h1>
                            <div className="flex gap-2 items-center p-2">
                                <p className=" text-sm text-gray-600">
                                    {
                                        post.created_at === post.updated_at
                                            ? dayjs(post.created_at).format('YYYY-MM-DD')
                                            : dayjs(post.updated_at).format('YYYY-MM-DD') + " edited."
                                    }
                                </p>
                                <div className={"flex items-center gap-2"}>
                                    <p>
                                        {post.likes_count > 0 && post.likes_count + " likes"}
                                    </p>
                                    <LikeButton post={post} auth={auth} initiallyLiked={post.liked_by_user}/>
                                </div>
                            </div>

                            <p className="mt-6 leading-8 text-gray-700">
                                {post.message}
                            </p>
                        </div>
                    </div>

                    {/*Blog Image section, which will be in right part of screen when it is lg.*/}
                    <div
                        className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <BlogImage image={post.image}/>
                    </div>

                    {/*Comments section*/}
                    <div
                        className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="flex-col items-center justify-center w-full">
                            <DetailOfComment post={post} comments={comments}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Detail;
