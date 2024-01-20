import React from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
const Index = ({auth, post}) => {
    const requestData = (post);
    console.log(requestData);
    console.log(auth);

    return (
        <div>
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                It's a test to see a props
            </div>
        </div>
    );
};

export default Index;
