import React from 'react';

const BlogImage = ({image}) => {

    return (
        <>
            {
                image && image.path
                    ? <img src={image.path} alt={image.name} className="rounded-md" />
                    : <img src={'/images/no-image.jpg'} alt={'No images uploaded'}
                    className="rounded-md"/>
            }
        </>
    );
};

export default BlogImage;
