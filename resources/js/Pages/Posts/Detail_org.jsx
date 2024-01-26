import React, {useState} from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head} from '@inertiajs/react';
import Comment from "@/Components/Comment.jsx";
import CommentEdit from "@/Components/CommentEdit.jsx";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import DetailOfPost from "@/Components/DetailOfPost.jsx";
import DetailOfComment from "@/Components/DetailOfComment.jsx";
import Header from "@/Components/Header.jsx";

const Detail = ({auth, post, comments}) => {
    // console.log(post);
    // console.log(auth);
    // console.log(comments);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={post.title}/>

            {/*Header*/}
            <Header title={post.title} />

            {/*Post section*/}
            <DetailOfPost post={post} auth={auth}/>

            {/*Comment section*/}
            <DetailOfComment post={post} comments={comments}/>


        </AuthenticatedLayout>
    );
}
export default Detail;
