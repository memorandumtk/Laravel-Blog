import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Post from "@/Pages/Posts/Post.jsx";

const Show = ({auth, posts}) => {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map(post =>
                        <Post key={post.id} post={post}/>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
