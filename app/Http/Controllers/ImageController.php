<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ImageService;

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
        $file = $request->file('imageData');
        $name = $file->getClientOriginalName(); // Generate a unique, random name...
        $extension = $file->extension(); // Determine the file's extension based on the file's MIME type...
        $storedName = time().'.'.$extension;
        $path = $file->storeAs('images', $storedName);
        $createdImage = Image::create([
            'title' => $name,
            'name' => $storedName,
            'path' => $path,
        ]);

//        return Inertia::render('Posts/Create', [
//            'createdImage' => $createdImage,
//        ]);
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
