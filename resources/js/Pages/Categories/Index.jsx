import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import Post from "@/Pages/Posts/Post.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import CategoryTag from "@/Components/CategoryTag.jsx";
import Header from "@/Components/Header.jsx";
import CreateCategoryBar from "@/Components/CreateCategoryBar.jsx";

const Index = ({auth, categories}) => {

    const colorVariants = {
        orange: 'bg-orange-200 hover:bg-orange-500',
        pink: 'bg-pink-200 hover:bg-pink-400',
        green: 'bg-green-200 hover:bg-green-400',
        sky: 'bg-green-200 hover:bg-green-400',
        indigo: 'bg-green-200 hover:bg-green-400',
        yellow: 'bg-yellow-200 hover:bg-yellow-400',
        white: 'bg-white text-black',
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories"/>

            {/*Header*/}
            <Header title={"Categories"}
                    subtitle={"You can see all of categories."}>
                <div>
                    <CreateCategoryBar/>
                </div>
            </Header>

            {/*Table of categories*/}
            <div className="flex flex-col justify-center items-center pt-6 bg-gray-100">
                <div className="overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-center font-light rounded-md">
                        <thead className=" bg-neutral-600 font-medium text-white ">
                        <tr>
                            <th scope="col" className="px-32 py-2">Name of Category</th>
                            <th scope="col" className="px-6 py-4">Number of posts</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={category.id} className={colorVariants[category.color]
                                    + " border-b border-slate-200"}>
                                    <td className="whitespace-nowrap px-32 py-3 font-medium">
                                        <Link href={route('categories.show', category.id)}>
                                            {category.name}
                                        </Link>
                                    </td>
                                    <td>
                                        {category.posts_count}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
