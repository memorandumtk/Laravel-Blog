<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Category;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'message',
        'excerpt',
    ];

    /**
     * @param Builder $query
     * @return void
     * Get posts based on 'search' value.
     */
    public function scopeSearch(Builder $query, string $search): void
    {
        $query->where('title', 'like', "%$search%")
            ->orWhere('message', 'like', "%$search%")
            ->orWhere('excerpt', 'like', "%$search%");
    }

    /**
     * @param Builder $query
     * @return Builder
     * Get posts with 'other users' and 'category'
     */
    public function scopeOthers(Builder $query, int $userId)
    {
       return $query->with('user:id,name', 'category')
            ->where('user_id', '<>', $userId)
            ->latest();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the comments for the blog post.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Belonging to relationship to Category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

}
