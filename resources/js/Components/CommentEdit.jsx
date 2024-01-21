import React from 'react';
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";

const CommentEdit = ({commentOfPost}) => {

    const { data, setData, post, processing, reset, errors } = useForm({
        content: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('comment.store'), { onSuccess: () => reset() });
    };



    return (
            <form onSubmit={submit}>
                    <textarea
                        value={data.content}
                        placeholder={'write your comment here.'}
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('content', e.target.value)}
                    ></textarea>
                {/*<InputError message={errors.message} className="mt-2"/>*/}
                <PrimaryButton className="mt-4" disabled={processing}>Comment</PrimaryButton>
            </form>
    );
};

export default CommentEdit;
