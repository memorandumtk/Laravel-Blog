import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from "@/Pages/Posts/Post.jsx";
import FirstPost from "@/Pages/Posts/FirstPost.jsx";
import CategoryModal from "@/Components/CategoryModal.jsx";
import BackGround from "@/Components/BackGround.jsx";
import Pagination from "@/Components/Pagination.jsx";

const Index = ({auth, categories, postsWithPagination}) => {

    console.log(postsWithPagination)

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            {/*Header*/}
            <Header title={"All Posts"}
                    subtitle={"You can see any posts whatever you want."}
            >
                <div className="flex lg:flex-col gap-2">
                    <div className="h-8 overflow-hidden">
                        <SearchBar isMyPost={false}/>
                    </div>
                    <div className="lg:self-end hover:text-gray-400">
                        <CategoryModal categories={categories}/>
                    </div>
                </div>
            </Header>

            <div className="flex flex-col gap-8 items-center pb-12">

                {/*Posts contents*/}
                <div
                    className="mx-auto px-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {postsWithPagination.data.map((post, index) => {
                        if (index === 0 && postsWithPagination.current_page === 1) {
                            return (
                                <FirstPost key={post.id} post={post}/>
                            )
                        } else {
                            return (
                                <Post key={post.id} post={post}/>
                            )
                        }
                    })}
                </div>

                {/*Pagination of posts*/}
                <div>
                    <Pagination links={postsWithPagination.links}/>
                </div>

            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
