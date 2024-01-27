<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyPostController extends Controller
{

    /**
     * Create ImageService so that I can leverage the function to store an image.
     */
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;
        $query = $request->query('draft');
        // If query string 'draft' is added, search and store the posts based on the condition.
        if($query) {
            $myPosts = Post::drafts($userId)->get();
        } else{
            $myPosts = Post::mine($userId)->get();
        }

        $categories = Category::all();

        return Inertia::render('MyPosts/Index', [
            'posts' => $myPosts,
            'categories' => $categories,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->posts()->create($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Post $my_post)
    {
        $userId = $request->user()->id;
        $postId = $my_post->id;
        $editPost = Post::mine($userId)
            ->where('id', '=', $postId)
            ->first();
        $categories = Category::all();

        return Inertia::render('MyPosts/Edit', [
            'editPost' => $editPost,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $my_post)
    {
        $this->authorize('update', $my_post);
        $validated = $request->validate([
            'data.title' => ['required', 'string', 'max:255'],
            'data.message' => ['required', 'string'],
            'data.excerpt' => ['required', 'string', 'max:255'],
            'data.category_id' => ['required', 'exists:categories,id'],
            'data.published' => ['boolean'],
            // Validate that an uploaded file is exactly 10 megabytes...
            'data.imageData' => ['nullable', 'file', 'max:10240'],
        ]);

        // If request has image file, store the image.
        if ($request->hasFile('data.imageData')) {
            // If requested post has already had an image, delete the image.
            if ($my_post->image_id) {
                $this->imageService->deleteImage($my_post->image_id);
            }
            $file = $request->file('data.imageData');
            $createdImage = $this->imageService->storeImage($file);
            $validated['data']['image_id'] = $createdImage->id;
        }

        $result = $my_post->update($validated['data']);

        return redirect(route('my-posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $my_post): RedirectResponse
    {
        $this->authorize('delete', $my_post);

        $my_post->delete();

        return redirect(route('my-posts.index'));
    }

}
