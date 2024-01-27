<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Image;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'image_id',
        'title',
        'message',
        'excerpt',
        'published',
        'published_at',
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
     * Get posts with 'other users' and 'category', posts being displayed should have been published.
     */
    public function scopeOthers(Builder $query, int $userId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->where('user_id', '<>', $userId)
            ->where('published', '=', true)
            ->latest();
    }

    /**
     * @param Builder $query
     * @param int $userId
     * @return Builder
     * Get the user's posts with 'image' and 'category'
     */
    public function scopeMine(Builder $query, int $userId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->where('user_id', '=', $userId)
            ->latest();
    }

    /**
     * @param Builder $query
     * @param int $userId
     * @return Builder
     * Get the user's posts based on 'draft' query string, with 'image' and 'category'
     */
    public function scopeDrafts(Builder $query, int $userId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->where('published', '=', false)
            ->latest();
    }

    /**
     * @param Builder $query
     * @param int $postId
     * @return Builder
     */
    public function scopeSpecificPost(Builder $query, int $postId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image', 'comments')
            ->withCount('likes')
            ->where('id', '=', $postId);
    }

    /**
     * Accessor to get liked boolean by user.
     */
    protected $appends = ['liked_by_user'];

    public function getLikedByUserAttribute()
    {
        return $this->likes->contains(auth()->user()->id);
    }

    /**
     *  Link to likes table to have a many-many relation between user and post
     */
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'likes');
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

    /**
     * Belonging to relationship to Image.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }
}
