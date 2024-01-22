import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import Post from "@/Components/Post.jsx";

const Index = ({auth, categories}) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {categories.map((category, index) => {
                    return (
                        <div key={category.id}>
                            <Link href={route('categories.show', category.id)}>
                                {category.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
