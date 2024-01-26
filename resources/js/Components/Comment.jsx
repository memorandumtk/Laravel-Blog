import React from 'react';
import Avatar from "@/Components/Avatar.jsx";
import dayjs from "dayjs";

const Comment = ({comment, post}) => {
    return (
        <li className="leading-6">
            <p>
                {comment.content}
            </p>
            <div className="relative pt-2 flex items-center gap-x-4">
                <Avatar post={post}/>
                <p className="text-gray-900">
                    <span className="absolute inset-0"/>
                    {post.user.blog_name}
                </p>
                <p className="text-sm ">
                    {'commented at ' + dayjs(comment.created_at).fromNow()}
                </p>
            </div>
        </li>
    );
};

export default Comment;
