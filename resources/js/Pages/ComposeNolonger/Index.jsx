import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import Post from "@/Components/Post.jsx";

export default function Index({auth}) {
    const {data, setData, post, processing, reset, errors} = useForm({
        title:'',
        message: '',
        excerpt: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {onSuccess: () => reset()});
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <textarea
                        value={data.title}
                        rows={1}
                        placeholder="Title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('title', e.target.value)}
                    ></textarea>
                    <textarea
                        value={data.message}
                        rows={10}
                        placeholder="Content of your post here..."
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <textarea
                        value={data.excerpt}
                        rows={2}
                        placeholder="Provided an excerption"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('excerpt', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2"/>
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
