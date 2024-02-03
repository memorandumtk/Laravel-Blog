<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
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

        // if query string 'search' is added, look for the posts containing that stirng.
        // otherwise, take all published posts except the request user's ones.
        if ($request->input('search')){
            $searchString = $request->input('search');
            //$othersPosts = Post::others($userId)->search($searchString)->get();
            $postsWithPagination = Post::othersWithQueryWithPagination($userId, $searchString);
        } else {
            // $othersPosts = Post::others($userId)->get();
            $postsWithPagination = Post::othersWithPagination($userId);
        }

        $categories = Category::all();

        return Inertia::render('Posts/Index', [
            // 'posts' => $othersPosts,
            'categories' => $categories,
            'postsWithPagination' => $postsWithPagination,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Posts/Create', [
            'categories' => $categories,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'excerpt' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'published' => ['boolean'],
            // Validate that an uploaded file is exactly 10 megabytes...
            'imageData' => ['file', 'max:10240'],
        ]);

        // Check if the post is marked as published and add the current timestamp
        if ($request->input('published')) {
            $validated['published_at'] = now();
        }
        // Check if an image is attached, if so call 'imageService and store the image.
        if ($request->hasFile('imageData')) {
            $file = $request->file('imageData');
            $createdImage = $this->imageService->storeImage($file);
            $validated['image_id'] = $createdImage->id;
        }

        $createdPost = $request->user()->posts()->create($validated);
        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post, Request $request)
    {
        $userId = $request->user()->id;
        $specificPost = Post::specificPost($post->id)->first();
        // needed to eager load comments because DetailOfComments component needs user info from comments prop.
        $comments = Comment::with('user:id,name,blog_name')
            ->where('post_id', $post->id)->get();
        return Inertia::render('Detail/Detail',
            [
                'post' => $specificPost,
                'comments' => $comments,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $post->update($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);

        $post->delete();

        return redirect(route('posts.index'));
    }
}
