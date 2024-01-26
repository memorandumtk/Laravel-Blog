<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Http\UploadedFile;

class ImageService
{
    public function storeImage(UploadedFile $file): Image
    {

        $name = $file->getClientOriginalName();
        $storedName = time() . '.' . $file->extension();
        $path = $file->storeAs('images', $storedName);

        return Image::create([
            'title' => $name,
            'name' => $storedName,
            'path' => $path,
        ]);
    }
}
