import React from 'react';
import {Head} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from "@/Components/Post.jsx";
// const posts = [
//     {
//         id: 1,
//         title: 'Boost your conversion rate',
//         href: '#',
//         description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//         date: 'Mar 16, 2020',
//         datetime: '2020-03-16',
//         category: { title: 'Marketing', href: '#' },
//         author: {
//             name: 'Michael Foster',
//             role: 'Co-Founder / CTO',
//             href: '#',
//             imageUrl:
//                 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         },
//     }]
const Home = ({auth, posts}) => {


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            {/*Header*/}
            <Header title={"All Posts"}
                    subtitle={"You can see any posts whatever you want."}
            >
                <div className="h-8 overflow-hidden">
                    <SearchBar/>
                </div>
            </Header>

            <div
                className="mx-auto px-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {posts.map((post) => {
                    return <Post key={post.id} post={post}/>
                })}
            </div>
        </AuthenticatedLayout>
    );
};

export default Home;
