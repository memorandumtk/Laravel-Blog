<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;
        $myPosts = Post::with('user:id,name')->where('user_id', $userId)->latest()->get();
        return Inertia::render('MyPosts/Index', [
            'posts' => $myPosts
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
        return Inertia::render('MyPosts/Edit', [
            'post' => $my_post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $my_post)
    {
        $this->authorize('update', $my_post);
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $my_post->update($validated);

        return redirect(route('my-posts.index'));
//        return Inertia::render('Test/Index', [
//            'post' => $my_post
//        ]);
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
// Default
//    /**
//     * Show the form for creating a new resource.
//     */
//    public function create()
//    {
//        //
//    }
//
//    /**
//     * Store a newly created resource in storage.
//     */
//    public function store(Request $request)
//    {
//        //
//    }
//
//    /**
//     * Display the specified resource.
//     */
//    public function show(Post $post)
//    {
//        //
//    }
//
//    /**
//     * Show the form for editing the specified resource.
//     */
//    public function edit(Post $post)
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     */
//    public function update(Request $request, Post $post)
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     */
//    public function destroy(Post $post)
//    {
//        //
//    }
//}
