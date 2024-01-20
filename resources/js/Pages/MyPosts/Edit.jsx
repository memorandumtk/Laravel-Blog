import React from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';

const Edit = ({ auth, myPost }) => {
    console.log(myPost);

    const { data, setData, put, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('my-posts.update'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="Content of your post here..."
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
