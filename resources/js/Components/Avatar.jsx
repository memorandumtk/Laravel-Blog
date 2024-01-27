import React from 'react';

const Avatar = ({name}) => {

    return (
        <>
            <img src={'https://ui-avatars.com/api/?name='+name+'&background=random&rounded=true&size=28'}/>
        </>
    );
};

export default Avatar;
