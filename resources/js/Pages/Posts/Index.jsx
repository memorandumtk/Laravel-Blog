import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from "@/Components/Post.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import CategoryTag from "@/Components/CategoryTag.jsx";
import {FaArrowRight} from "react-icons/fa";
import CategoryModal from "@/Components/CategoryModal.jsx";

const Index = ({auth, posts, categories}) => {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            {/*Header*/}
            <Header title={"All Posts"}
                    subtitle={"You can see any posts whatever you want."}
            >
                <div className="flex flex-col gap-2">
                    <div className="h-8 overflow-hidden">
                        <SearchBar/>
                    </div>
                    <div className="self-end">
                        <CategoryModal categories={categories} />
                    </div>
                </div>
            </Header>

            {/*Posts contents*/}
            <div
                className="mx-auto px-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {posts.map((post) => {
                    return <Post key={post.id} post={post}/>
                })}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;