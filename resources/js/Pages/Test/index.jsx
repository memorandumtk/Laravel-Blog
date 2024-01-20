import React from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
const Index = ({myPosts}) => {
    console.log(myPosts);

    return (
        <div>
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {myPosts.map(post =>
                    <Post key={post.id} post={post}/>
                )}
            </div>
        </div>
    );
};

export default Index;
