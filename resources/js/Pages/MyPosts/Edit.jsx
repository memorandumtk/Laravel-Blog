import React, {useState} from 'react';
import Post from "@/Components/Post.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, Head, router} from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import CategorySelect from "@/Components/CategorySelect.jsx";
import Checkbox from "@/Components/Checkbox.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Edit = ({auth, editPost, categories}) => {

    console.log(editPost);

    const {data, setData, patch, put, errors, reset} = useForm({
        title: editPost.title,
        message: editPost.message,
        excerpt: editPost.excerpt,
        category_id: editPost.category_id,
        published: editPost.published,
        imageData: null,
    });
    // const [imageFile, setImageFile] = useState(null);
    // To display image that the user will upload.
    const [previousImg, setPreviewImg] = useState(
        editPost.image ? editPost.image : null
    )

    // Handler for file input change
    const handleImageChange = (e) => {
        setData("imageData", e.target.files[0])
        // setImageFile(e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
    };

    const handleCategoryChange = (e) => {
        // Update the category_id, exa of target:{value: 5}
        setData('category_id', e.target.value);
    };

    const submit = (e) => {
        e.preventDefault()
        router.post(route('my-posts.update', editPost.id), {
                _method: 'put',
                data: data,
            },
            {
                forceFormData: true,
            })
    }


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit"/>

            {/*Header*/}
            <Header title={"Edit the Post"}
                    subtitle={"You can change it as much as you can."}
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
                    </div>

                    <div>
                        <InputLabel htmlFor="message" value="Content of your blog"/>
                        <textarea
                            id={'message'}
                            name={'message'}
                            value={data.message}
                            rows={10}
                            placeholder="Content of your editPost here..."
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('message', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="excerpt" value="Excerptioin of your blog"/>
                        <textarea
                            id={'excerpt'}
                            name={'excerpt'}
                            value={data.excerpt}
                            rows={5}
                            placeholder="Provided an excerption"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('excerpt', e.target.value)}
                        ></textarea>
                    </div>

                    {/*// For upload an image.*/}
                    <div>
                        <InputLabel htmlFor="image_url" value="Upload an image if you want to change last image"
                                    className="block text-sm font-medium text-gray-900"
                        />
                        <div className="flex flex-col gap-2">
                            <input type="file"
                                   className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none
                                file:bg-slate-900 file:text-white hover:file:bg-slate-950 file:h-full"
                                   onChange={handleImageChange}/>
                            <p className="text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG
                                or GIF (MAX. 10M bytes).</p>
                            {
                                previousImg
                                    && < img id='preview_img'
                                            src={previousImg.path}
                                            className={"object-cover rounded-md"}
                                            alt={previousImg.name}/>
                            }
                        </div>
                    </div>

                    <div className="flex mt-4 gap-4 justify-between pr-2 items-center">
                        {/*For select an category*/}
                        <div className="flex-1">
                            <CategorySelect categories={categories} handleCategoryChange={handleCategoryChange}
                                            categoryId={editPost.category_id}
                            />
                        </div>

                        {/*Check box for whether the editPost would be uploaded or not.*/}
                        <div className="flex items-center">
                            <label>
                                <Checkbox
                                    name="published"
                                    checked={data.published}
                                    onChange={(e) => setData('published', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Would you like to editPost this?</span>
                            </label>
                        </div>

                        <div>
                            <PrimaryButton className="bg-indigo-900">
                                {data.published ? 'Post' : 'Save as Draft'}
                            </PrimaryButton>
                        </div>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
export default Edit;
