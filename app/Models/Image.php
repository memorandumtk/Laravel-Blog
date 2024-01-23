<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'name'
    ];

    /**
     * Get the user's first name.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn($value) => url('storage/', $value),
//            get: fn($value) => url('uploads/' . $value),
        );
    }
}
