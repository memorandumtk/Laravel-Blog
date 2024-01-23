import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import Post from "@/Components/Post.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Create({auth}) {
    const {data, setData, post, processing, reset, errors} = useForm({
        title: '',
        message: '',
        excerpt: '',
        category_id: 3,
        published: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {onSuccess: () => reset()});
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Compose</h2>}
        >

            <Head title="Posts"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                        <InputLabel htmlFor="title" value="Title of your blog"/>
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="block w-full"
                            placeholder="Title"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="message" value="Content of your blog"/>
                        <textarea
                            id={'message'}
                            name={'message'}
                            value={data.message}
                            rows={10}
                            placeholder="Content of your post here..."
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('message', e.target.value)}
                        />
                        <InputError message={errors.message} className=""/>
                    </div>
                    <div>
                        <InputLabel htmlFor="excerpt" value="Excerptioin of your blog"/>
                        <textarea
                            id={'excerpt'}
                            name={'excerpt'}
                            value={data.excerpt}
                            rows={2}
                            placeholder="Provided an excerption"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('excerpt', e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex mt-4 gap-4 justify-between px-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="published"
                                checked={data.published}
                                onChange={(e) => setData('published', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Would you like to post this?</span>
                        </label>
                        <PrimaryButton className="bg-indigo-900" disabled={processing}>
                            {data.published ? 'Post' : 'Save as Draft'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
