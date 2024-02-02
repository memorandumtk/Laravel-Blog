import React from 'react';

const LikesAggregation = ({totalLikes, weekTotalLikes}) => {
    return (
        <div
            className="hidden lg:flex col-span-1 border-l-4 border-t-2 p-4 flex-col gap-4 items-center justify-center">
            <p className="leading-6 text-gray-900 ">
                Total Your Likes
            </p>
            <p className="text-lg font-semibold leading-6 text-emerald-500 italic">
                {totalLikes}
            </p>
            <p className="leading-6 text-gray-900 ">
                Week of Total Your Likes
            </p>
            <p className="text-lg font-semibold leading-6 text-emerald-500 italic">
                {weekTotalLikes}
            </p>
        </div>
    );
};

export default LikesAggregation;
