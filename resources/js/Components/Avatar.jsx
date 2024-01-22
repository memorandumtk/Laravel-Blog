import React from 'react';

const Avatar = ({post}) => {
    const name = post.user.name;

    return (
        <>
            <img src={'https://ui-avatars.com/api/?name='+name+'&background=random&rounded=true&size=32'}/>
        </>
    );
};

export default Avatar;
