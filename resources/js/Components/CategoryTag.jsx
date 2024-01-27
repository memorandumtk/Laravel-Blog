import React from 'react';
import {Link} from "@inertiajs/react";

const CategoryTag = ({post=null, categoryProp = null}) => {

    const category = post ? post.category : categoryProp;
    const color = category.color ? category.color : 'white'
    // Ref: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
    const colorVariants = {
        orange: 'bg-orange-600 hover:bg-orange-500 text-white',
        pink: 'bg-pink-500 hover:bg-pink-400 text-white',
        green: 'bg-green-500 hover:bg-green-400 text-white',
        sky: 'bg-green-500 hover:bg-green-400 text-white',
        indigo: 'bg-green-500 hover:bg-green-400 text-white',
        yellow: 'bg-yellow-300 hover:bg-yellow-400 text-white',
        white: 'bg-white text-black',
    }

    return (
        <Link href={route('categories.show', category.id)}
              className={`${colorVariants[color]} border rounded-full px-2`}>
            {category.name}
        </Link>
    );
};

export default CategoryTag;
