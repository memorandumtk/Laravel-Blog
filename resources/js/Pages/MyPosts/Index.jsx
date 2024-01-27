import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useForm, Head, Link} from '@inertiajs/react';
import MyPost from "@/Pages/MyPosts/MyPost.jsx";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import {FaArrowRight} from "react-icons/fa";
import Modal from "@/Components/Modal.jsx";
import CategoryTag from "@/Components/CategoryTag.jsx";
import CategoryModal from "@/Components/CategoryModal.jsx";

export default function Index({auth, posts, categories}) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const isDraft = urlSearchParams.get('draft') === 'yes';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Posts"/>

            {/*Header*/}
            <Header title={"Posts of " + auth.user.blog_name}
                    subtitle={"You can see your posts here."}>
                {
                    <div className="self-end text-sm hover:text-gray-400 py-2">
                        {
                            isDraft
                                ? <Link href={route('my-posts.index')}>
                                    <p className="flex items-center">Back to all of your posts<FaArrowRight/></p></Link>
                                :
                                <Link href={route('my-posts.index') + '?draft=yes'}>
                                    <p className="flex items-center">Go to your drafts<FaArrowRight/></p></Link>
                        }
                        <div className="self-end">
                            <CategoryModal categories={categories} />
                        </div>
                    </div>
                }
            </Header>

            {/*<div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">*/}
            <div
                className="mx-auto px-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {posts.map(post =>
                    <MyPost key={post.id} post={post}/>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
