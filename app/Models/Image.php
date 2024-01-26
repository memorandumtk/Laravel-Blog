<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'name',
        'path',
    ];

//    protected function name(): Attribute
//    {
//        return Attribute::make(
//            get: fn($value) => url('images', $value),
////            get: fn($value) => url('uploads/' . $value),
//        );
//    }
    /**
     * Get the entire URL about 'path' attribute.
     */
    protected function path(): Attribute
    {
        return Attribute::make(
            get: fn($value) => url($value),
        );
    }


    public function post(): HasOne
    {
        return $this->hasOne(Post::class);
    }
}
