<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Image;
use Illuminate\Http\Resources\Json\PaginatedResourceResponse;

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
     * Query builder to get posts based on 'search' value by looking for it from 'title' and 'message'.
     */
    public function scopeSearch(Builder $query, string $search): void
    {
        $query->where(function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('message', 'like', '%' . $search . '%');
        });
    }

    /**
     * @param Builder $query
     * @return Builder
     * Get others' posts with 'other users' and 'category', posts being displayed should have been published.
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
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     * Get others' posts with relationships as well as narrowing the result.
     */
    public function scopeOthersWithPagination(Builder $query, int $userId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->where('user_id', '<>', $userId)
            ->where('published', '=', true)
            ->latest()
            ->paginate(9);
    }

    /**
     * @param Builder $query
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     * Get others' posts with relationships and searching by query string..
     */
    public function scopeOthersWithQueryWithPagination(Builder $query, int $userId, string $queryString)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->search($queryString)
            ->where('user_id', '<>', $userId)
            ->where('published', '=', true)
            ->latest()
            ->paginate(9);
    }

    /**
     * @param Builder $query
     * @param int $userId
     * @return Builder
     * Get my posts with 'image' and 'category'
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
     * @param string $queryString
     * @return LengthAwarePaginator
     * Get my posts with relationships and searching by query string.
     */
    public function scopeMineWithPagination(Builder $query, int $userId, string $queryString = null)
    {
        if ($queryString) {
            return $query->with('user:id,name,blog_name', 'category', 'image')
                ->withCount('likes')
                ->search($queryString)
                ->where('user_id', '=', $userId)
                ->where('published', '=', true)
                ->latest()
                ->paginate(9);
        } else {
            return $query->with('user:id,name,blog_name', 'category', 'image')
                ->withCount('likes')
                ->where('user_id', '=', $userId)
                ->where('published', '=', true)
                ->latest()
                ->paginate(9);
        }
    }

    /**
     * @param Builder $query
     * @param int $userId
     * @return LengthAwarePaginator
     * Get my posts based on 'draft' query string, with 'image' and 'category'
     */
    public function scopeDrafts(Builder $query, int $userId)
    {
        return $query->with('user:id,name,blog_name', 'category', 'image')
            ->withCount('likes')
            ->where('user_id', '=', $userId)
            ->where('published', '=', false)
            ->latest()
            ->paginate(9);
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
            ->with('recentLikes')
            ->where('id', '=', $postId);
    }

    /**
     * Get recent likes with in a week.
     */
    public function recentLikes()
    {
        return $this->hasMany(Like::class, 'post_id')
            ->where('created_at', '>', now()->subWeek());
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
