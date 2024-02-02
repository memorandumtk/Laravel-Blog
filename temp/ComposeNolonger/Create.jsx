import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import {useForm, Head, router} from '@inertiajs/react';
import Post from "@/Pages/Posts/Post.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Header from "@/Components/Header.jsx";
import SearchBar from "@/Components/SearchBar.jsx";
import CategorySelect from "@/Components/CategorySelect.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Create({auth, categories}) {
    const {data, setData, post, processing, reset, errors, progress} = useForm({
        title: '',
        message: '',
        excerpt: '',
        category_id: null,
        published: 0,
    });

    const [imageFile, setImageFile] = useState(null);
    // To display image that the user will upload.
    const [previewImg, setPreviewImg] = useState(null)

    // Handler for file input change
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
    };

    const handleCategoryChange = (e) => {
        setData('category_id', e.target.value); // Update the category_id, exa of target:{value: 5}
    };

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('message', data.message);
        formData.append('excerpt', data.excerpt);
        formData.append('category_id', data.category_id);
        // Convert boolean to 1 or 0
        formData.append('published', data.published ? 1 : 0);

        // Append the image file if it's selected
        if (imageFile) {
            formData.append('imageData', imageFile);
        }

        router.post(route('posts.store'), formData, {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}>
            <Head title="Create"/>

            {/*Header*/}
            <Header title={"Create Your Post"}
                    subtitle={"You can write everything you want."}
            />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                        <InputLabel htmlFor="title" value="Title of your blog"/>
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="block w-full"
                            placeholder="Title"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.message} className="mt-2"/>
                    </div>

                    <div>
                        <InputLabel htmlFor="message" value="Content of your blog"/>
                        <textarea
                            id={'message'}
                            name={'message'}
                            value={data.message}
                            rows={10}
                            placeholder="Content of your post here..."
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('message', e.target.value)}
                        />
                        <InputError message={errors.message} className=""/>
                    </div>

                    <div>
                        <InputLabel htmlFor="excerpt" value="Excerptioin of your blog"/>
                        <textarea
                            id={'excerpt'}
                            name={'excerpt'}
                            value={data.excerpt}
                            rows={2}
                            placeholder="Provided an excerption"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('excerpt', e.target.value)}
                        ></textarea>
                        <InputError message={errors.message} className=""/>
                    </div>

                    {/*// For upload an image.*/}
                    <div>
                        <InputLabel htmlFor="image_url" value="Upload a image of your post"
                                    className="block text-sm font-medium text-gray-900"
                        />
                        <div className="flex flex-col gap-4 ">
                            <input type="file"
                                   className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none
                                file:bg-slate-900 file:text-white hover:file:bg-slate-950 file:h-full"
                                   onChange={handleImageChange}/>
                            <img id='preview_img'
                                 src={previewImg}
                                 className={classNames(
                                     previewImg
                                         ? "object-cover rounded-md"
                                         : "hidden"
                                 )}
                                 alt="Current profile photo"/>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG
                            or GIF (MAX. 10M bytes).</p>
                        <InputError message={errors.message} className=""/>
                    </div>

                    <div className="flex mt-4 gap-4 justify-between pr-2 items-center">
                        {/*For select an category*/}
                        <div className="flex-1">
                            <CategorySelect categories={categories} handleCategoryChange={handleCategoryChange}/>
                        </div>

                        {/*Check box for whether the post would be uploaded or not.*/}
                        <div className="flex items-center">
                            <label>
                                <Checkbox
                                    name="published"
                                    checked={data.published}
                                    onChange={(e) => setData('published', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Would you like to post this?</span>
                            </label>
                        </div>

                        <div>
                            <PrimaryButton className="bg-indigo-900" disabled={processing}>
                                {data.published ? 'Post' : 'Save as Draft'}
                            </PrimaryButton>
                        </div>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
