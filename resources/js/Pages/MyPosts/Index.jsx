import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useForm, Head, Link} from '@inertiajs/react';
import MyPost from "@/Pages/MyPosts/MyPost.jsx";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import {FaArrowRight} from "react-icons/fa";

export default function Index({auth, posts}) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const isDraft = urlSearchParams.get('draft') === 'yes';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Posts"/>

            {/*Header*/}
            <Header title={"Posts of " + auth.user.blog_name}
                    subtitle={"You can see your posts here."}>
                    {/*<div className="h-8 overflow-hidden">*/}
                    {/*    <SearchBar/>*/}
                    {/*</div>*/}
                    {
                        <div className="self-end text-sm hover:text-gray-400 py-2">
                            {
                                isDraft
                                    ? <Link href={route('my-posts.index')}>
                                        <p className="flex items-center"><FaArrowRight/>Back to all of your posts</p></Link>
                                    :
                                    <Link href={route('my-posts.index') + '?draft=yes'}>
                                        <p className="flex items-center"><FaArrowRight/>Go to your drafts</p></Link>
                            }
                        </div>
                    }
            </Header>

            {/*<div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">*/}
            <div
                className="mx-auto px-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 justify-items-center pt-4 sm:pt-8 lg:mx-0 lg:max-w-none">
                {/*<div className="mt-6 bg-white shadow-sm rounded-lg divide-y">*/}
                {posts.map(post =>
                    <MyPost key={post.id} post={post}/>
                )}
            </div>
            {/*</div>*/}
        </AuthenticatedLayout>
    );
}
