import {Link, Head} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {FaArrowRight} from "react-icons/fa";

export default function Landing({auth, laravelVersion, phpVersion}) {
    return (
        <>
            <Head title="Welcome"/>
            <div
                className="p-36 relative flex flex-col gap-4 justify-center items-end min-h-screen bg-dots-darker bg-center ">

                <h1
                    className="text-4xl font-semibold text-gray-600 dark:text-gray-400"
                >
                    Welcome To K Blog
                </h1>
                <p
                    className="font-semibold text-gray-600 dark:text-gray-400"
                >
                    Write something as you desire.
                </p>

                <div className="flex flex-col text-lg font-semibold text-gray-600 dark:text-gray-400">
                {auth.user ? (
                    <>
                        <Link
                            href={route('posts.index')}
                            className={"flex gap-2 items-center hover:underline transition ease-in-out hover:translate-x-1 duration-200"}
                        >
                            All Posts
                            <FaArrowRight/>
                        </Link>
                        <Link
                            href={route('my-posts.index')}
                            className={"flex gap-2 items-center hover:underline transition ease-in-out hover:translate-x-1 duration-200"}
                        >
                            My Posts
                            <FaArrowRight/>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className={"flex gap-2 items-center hover:underline transition ease-in-out hover:translate-x-1 duration-200"}
                        >
                            Log in
                            <FaArrowRight/>
                        </Link>
                        <Link
                            href={route('register')}
                            className={"flex gap-2 items-center hover:underline transition ease-in-out hover:translate-x-1 duration-200"}
                        >
                            Register
                            <FaArrowRight/>
                        </Link>
                    </>
                )}
                </div>

                <ApplicationLogo className="opacity-60 absolute inset-0 w-full h-full object-cover -z-10"/>
            </div>




        </>
    )
        ;
}
