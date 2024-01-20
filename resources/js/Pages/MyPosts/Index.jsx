import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useForm, Head} from '@inertiajs/react';
import MyPost from "@/Components/MyPost.jsx";

export default function Index({auth, posts}) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map(post =>
                        <MyPost key={post.id} post={post}/>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
