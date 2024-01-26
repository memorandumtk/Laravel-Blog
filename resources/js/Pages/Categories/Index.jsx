import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import Post from "@/Components/Post.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import CategoryTag from "@/Components/CategoryTag.jsx";

const Index = ({auth, categories}) => {
    // Function to generate random position within a range
    const randomPosition = () => {
        // Adjust these ranges according to your layout's size
        const top = Math.random() * 60; // Random top position (0% to 80%)
        const left = Math.random() * 60; // Random left position (0% to 80%)
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories"/>


            <div className="flex flex-col justify-center items-center pt-6 bg-gray-100">

                <div>
                    <SearchBar/>
                </div>

                <div className="mx-auto min-w-full min-h-64 p-4 sm:p-6 lg:p-8 relative">
                    {categories.map((category, index) => {
                        const style = randomPosition(); // Generate random position for each category
                        return (
                            <div key={category.id} style={{position: 'absolute', ...style}}>
                                <Link href={route('categories.show', category.id)}>
                                    {category.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/*<div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">*/}
                {/*    {categories.map((category, index) => {*/}
                {/*        return (*/}
                {/*            <div key={category.id}>*/}
                {/*                <Link href={route('categories.show', category.id)}>*/}
                {/*                    {category.name}*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
