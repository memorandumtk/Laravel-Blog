import React from 'react';
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import LikeButton from "@/Components/LikeButton.jsx";

const DetailOfPost = ({post, auth}) => {

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">

            <p>
                {post.published_at}
            </p>
            <LikeButton post={post} auth={auth} initiallyLiked={post.liked_by_user} />

            <p>
                {post.message}
            </p>
        </div>
    );
};

export default DetailOfPost;
