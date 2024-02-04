import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useForm, Head, Link} from '@inertiajs/react';
import MyPost from "@/Pages/MyPosts/MyPost.jsx";
import FirstMyPost from "@/Pages/MyPosts/FirstMyPost.jsx";
import Header from "@/Components/Header.jsx";
import {FaArrowRight} from "react-icons/fa";
import CategoryModal from "@/Components/CategoryModal.jsx";
import useBreakpoint from "@/Hooks/BreakpointObserver.js";
import LikesAggregation from "@/Pages/MyPosts/LikesAggregation.jsx";
import SearchBar from "@/Components/SearchBar.jsx";

export default function Index({auth, posts, categories, totalLikes, weekTotalLikes}) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const isDraft = urlSearchParams.get('draft') === 'yes';

    const breakpoint = useBreakpoint();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Posts"/>

            {/*Header*/}
            <Header title={"Posts of " + auth.user.blog_name}
                    subtitle={"You can see your posts here."}>

                <div className="flex flex-col gap-2 items-center">

                    <div className="h-8 overflow-hidden">
                        <SearchBar isMyPost={true}/>
                    </div>
                    <div className="lg:self-end">
                        <CategoryModal categories={categories}/>
                        {
                            isDraft
                                ? <Link href={route('my-posts.index')}>
                                    <p className="flex items-center hover:text-gray-400">Back to all of your
                                        posts<FaArrowRight/></p></Link>
                                :
                                <Link href={route('my-posts.index') + '?draft=yes'}>
                                    <p className="flex items-center hover:text-gray-400">Go to your
                                        drafts<FaArrowRight/></p></Link>
                        }
                    </div>

                </div>
            </Header>

            {/*<div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">*/}
            <div
                className="mx-auto px-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {posts.data.map((post, index) => {
                    // if breakpoints is larger than `lg`, it is first post, current page is 1..
                    if (index === 0 && posts.current_page === 1 && breakpoint >= 3) {
                        return (
                            <>
                                <FirstMyPost key={post.id} post={post} breakpoint={breakpoint}/>
                                <LikesAggregation totalLikes={totalLikes} weekTotalLikes={weekTotalLikes}/>
                            </>
                        )
                    } else {
                        return (
                            <MyPost key={post.id} post={post} breakpoint={breakpoint}/>
                        )
                    }
                })}
            </div>
        </AuthenticatedLayout>
    );
}
