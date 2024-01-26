import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import Post from "@/Components/Post.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import Header from "@/Components/Header.jsx";

export default function Index_org({auth, posts}) {


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            {/*Header*/}
            <Header title={"All Posts"}>
                <div className="h-8 overflow-hidden">
                    <SearchBar/>
                </div>
            </Header>

            <div className="flex flex-col items-center max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map(post =>
                        <Post key={post.id} post={post} initiallyLiked={post.likes}/>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
