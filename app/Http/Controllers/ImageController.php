<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = Image::latest()->get();
        $fileNames = Image::all()->pluck('name'); // get name with url.
        return Inertia::render('fileUpload', compact(['fileNames','files']));
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
            'title' => ['required'],
            'file' => ['required'],
        ]);

        $fileName = time().'.'.$request->file->extension();
        $request->file->move(public_path('storage'), $fileName);

//        $createdImage = $request->user()->create($validated);
        Image::create([
            'title' => $request->title,
            'name' => $fileName
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
