<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Builder;
use function Termwind\render;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $categories = Category::all();
        $categories = Category::withCount('posts')->get();
        return Inertia::render('Categories/Index', [
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $colors = ['orange', 'yellow', 'green', 'sky', 'indigo', 'pink'];
        $color = $colors[random_int(0, 5)];
        $validated['color'] = $color;

        $createdCategory = Category::create($validated);
        return redirect(route('categories.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $categorizedPosts = Post::with(['category', 'user'])
            ->where('category_id', '=', $category->id)
            ->get();
        return Inertia::render('Categories/Show', [
            'posts' => $categorizedPosts
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
