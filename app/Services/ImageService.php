<?php

namespace App\Services;

use App\Models\Image;
use App\Models\Post;
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

    public function deleteImage($image_id)
    {
        // Update referencing Post records to remove the image association
        Post::where('image_id', $image_id)->update(['image_id' => null]);

        // Now that no Post records reference the Image, it can be safely deleted
        $image = Image::findOrFail($image_id);
        return $image->delete();
    }
}
