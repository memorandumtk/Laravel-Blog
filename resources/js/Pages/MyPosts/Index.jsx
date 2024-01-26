import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useForm, Head} from '@inertiajs/react';
import MyPost from "@/Pages/MyPosts/MyPost.jsx";

export default function Index({auth, posts}) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Posts"/>
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
