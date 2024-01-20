import React, {useState} from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';

const Edit = ({ auth, post }) => {
    console.log(post);
    console.log(auth);

    const { data, setData, put, patch, processing, reset, errors } = useForm({
        message: post.message
    });

    // const [ editedMessage, setEditedMessage ] = useState(post.message);

    const submit = (e) => {
        e.preventDefault();
        patch(route('my-posts.update', post.id), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2"/>
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
export default Edit;
