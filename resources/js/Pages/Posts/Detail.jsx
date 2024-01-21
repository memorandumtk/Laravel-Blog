import React, {useState} from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import Comment from "@/Components/Comment.jsx";
import CommentEdit from "@/Components/CommentEdit.jsx";

const Detail = ({ auth, post, comments }) => {
    console.log(post);
    console.log(auth);
    console.log(comments);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {post.message}
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {comments.map((comment) =>
                    <Comment key={comment.id} comment={comment}/>
                )}
            </div>

            <CommentEdit commentOfPost={post}/>

        </AuthenticatedLayout>
    );
}
export default Detail;
