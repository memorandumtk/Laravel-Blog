import React, {useState} from 'react';
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {router} from "@inertiajs/react";

const LikeButton = ({post, initiallyLiked, auth}) => {
    const [liked, setLiked] = useState(initiallyLiked);
    // const handleClick = (e) => {
    //     // If like button is clicked, send the data of boolean value to the route.
    //     setLiked(!liked);
    // };
    const toggleLike = (e) => {
        e.preventDefault();
        const url = `/posts/${post.id}/${liked ? 'unlike' : 'like'}`;
        axios.post(url).then(response => {
            setLiked(!liked);
        });
    };

    // return (
    //     <button onClick={toggleLike}>
    //         {liked ? 'Unlike' : 'Like'}
    //     </button>
    // );
    if (liked)
        return (
            <button type="button" onClick={toggleLike}>
                <AiFillLike />
            </button>
        )
    return (
        <button type="button" onClick={toggleLike}>
            <AiOutlineLike />
        </button>
    )
};

export default LikeButton;
