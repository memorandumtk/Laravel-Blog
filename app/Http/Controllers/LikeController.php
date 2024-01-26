<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    /**
     * Like manipulation, the user can only put 'likes' once per a post.
     *
     */
    public function likePost($postId) {
        $user = auth()->user();
        // Check if the user has already liked the post
        if ($user->likedPosts()->where('post_id', $postId)->exists()) {
            return response()->json(['message' => 'Already Liked'], 409); // Conflict response
        }
        // Attach the like if not already liked
        $user->likedPosts()->attach($postId);
        return response()->json(['message' => 'Liked']);
    }
    public function unlikePost($postId) {
        $user = auth()->user();
        $user->likedPosts()->detach($postId);
        return response()->json(['message' => 'Unliked']);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
