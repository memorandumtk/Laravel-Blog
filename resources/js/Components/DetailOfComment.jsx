import React from 'react';
import Comment from "@/Components/Comment.jsx";
import CommentEdit from "@/Components/CommentEdit.jsx";

const DetailOfComment = ({post, comments = null}) => {

    return (
        <div className="flex flex-col py-4">
            <p>
                Comments
            </p>
            <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700"/>
            <ul role="list" className=" mt-8 space-y-8 text-gray-600">
                {
                    comments &&
                    comments.map((comment) => {
                            return <Comment key={comment.id} comment={comment} post={post}/>
                        }
                    )}
            </ul>

            <div className="pt-8">
                <CommentEdit commentOfPost={post}/>
            </div>
        </div>
    );
};

export default DetailOfComment;
