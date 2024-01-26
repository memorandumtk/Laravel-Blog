import React from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import BlogImage from "@/Components/BlogImage.jsx";
import DetailOfComment from "@/Components/DetailOfComment.jsx";
import DetailBackground from "@/Components/DetailBackground.jsx";
import dayjs from "dayjs";
import Category from "@/Components/CategoryTag.jsx";

const Index = ({auth, post}) => {

    const postDetail = post[0]
    console.log((postDetail))

    return (
        <AuthenticatedLayout user={auth.user}>

            <div className="relative isolate overflow-hidden bg-white px-6 py-12 lg:overflow-visible">

                {/*Background & Style section*/}
                <DetailBackground/>

                {/*Sentence section*/}
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div
                        className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:max-w-lg">
                            {
                                postDetail.category && <Category post={postDetail}/>
                            }
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {postDetail.title}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {
                                    postDetail.created_at === postDetail.updated_at
                                    ? dayjs(postDetail.created_at).format('YYYY-MM-DD')
                                    : dayjs(postDetail.updated_at).format('YYYY-MM-DD') +" edited."
                                }
                            </p>
                            <p className="mt-6 leading-8 text-gray-700">
                                {postDetail.message}
                                {postDetail.message}
                                {postDetail.message}
                                {postDetail.message}
                            </p>
                        </div>
                    </div>
                    <div
                        className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <BlogImage/>
                    </div>
                    <div
                        className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="flex-col items-center justify-center w-full">
                            <DetailOfComment post={postDetail} comments={postDetail.comments}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Index;
