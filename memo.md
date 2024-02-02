curl -s "https://laravel.build/kosuke-blog?with=mysql" | bash

sail npm --version
sail artisan --version
sail php --version
sail composer --version


---install---
curl -s "https://laravel.build/blog?with=mysql" | bash
sail up -d
sail npm --version
sail artisan --version
sail php --version
sail composer --version
sail composer require laravel/breeze --dev
sail php artisan breeze:install react
sail php artisan migrate


- make model, migration, and resource controller for Posts
  sail php artisan make:model -mrc Post

- create policy for post
  sail php artisan make:policy PostPolicy --model=Post

- Create Comment model.
```
sail php artisan make:model Comment
```

- Create Comment migration file.
```
sail php artisan make:migration create_comments_table
```

- Do migration after making model and table(migration)
```
sail php artisan migrate
```

- Make a Post factory
```
php artisan make:factory PostFactory

```

- Make a Contoller, here for Comment, based on Comment model and make resource.
```
sail php artisan make:controller CommentController --resource
```

- Make a function to write new comment.
```
public function store(Request $request, Post $post)
{
    $comment = $request->validate([
        'content' => 'required|string|max:255',
    ]);

    $commentObj = $post->comments()->create([
        'content' => $comment['content'],
        'user_id' => request()->user()->id,
    ]);

    return back();

}
```

- Make a Category model with migration.
```
sail php artisan make:model Category --migration
```

- Add column for Post table (existing).
```
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
Schema::table('posts', function (Blueprint $table) {
$table->foreignId('category_id')->nullable()->constrained();
});
```

- Make DB fresh and seed to the DB
```
sail php artisan migrate:fresh --seed
```

- Make a Category factory.
```
sail php artisan make:factory Category --model=Category
``` 

- How to get avatar for each user.
  Ref URL:https://ui-avatars.com/
* 'name' is taken from prop avatar component itself.
```
<img src={'https://ui-avatars.com/api/?name='+name+'&background=random&rounded=true&size=32'}/>
```

- Make a controller for Category.
```
sail php artisan make:controller CategoryController --resource
```

- How to assign color variables to Tailwind CSS.
  https://github.com/tailwindlabs/tailwindcss/discussions/1507#discussioncomment-3099879


- How to import React icon and use.
  Ref URL: https://react-icons.github.io/react-icons/


- How to retrive only posts matches `search` text.
  Ref URL: https://laravel.com/docs/10.x/eloquent#local-scopes


- How to use query builder and scope.
  Ref URL: https://laravel.com/docs/10.x/eloquent#dynamic-scopes
```
// I changed original index function in posts to make it more usuful with builder
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;
        $othersPosts = Post::others($userId)->get();
        return Inertia::render('Posts/Index', [
            'posts' => $othersPosts
        ]);
    }
// Below is scope with query builder.
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
```

- Command to make model with controller, migration, resource.
```
sail php artisan make:model -c --migration --resource Image
```


- How to store and upload image
  Ref url
  https://techsolutionstuff.com/post/how-to-upload-image-in-laravel-9-using-react-js#google_vignette

-- Changed links parameter in filesystem.php config.
```
public_path('images') => storage_path('app/images'),

-- after this change, an example of acceesible URL is:
http://localhost/images/1706025344.png
```

- Added to register parameter 'blog_name'
  -- Edit Files:Register.jsx, RegisteredUserController.php,
  Ref URL:
  https://dev.to/kingsconsult/customize-laravel-auth-laravel-breeze-registration-and-login-1769
* with 'sail' prefix for php artisan commnad.


- How to generate some images using factory
  -- Ref URL:
  https://smknstd.medium.com/fake-beautiful-images-in-laravel-51062967d1db
```
sail php artisan make:factory --model=Image ImageFactory
```
-- How to delete images everytime seed is happned.
Ref URL
https://www.geeksforgeeks.org/deleting-all-files-from-a-folder-using-php/







### Clitical Code & Point

- Get the data using correspoinding user id from Post model.
```
$myPosts = Post::with('user:id,name')->where('user_id', $userId)->latest()->get();
$othersPosts = Post::with('user:id,name')->whereNot('user_id', $userId)->latest()->get();
```

- Make a policy
```
sail php artisan make:policy PostPolicy --model=Post

-- Add this line to update & delete
return $chirp->user()->is($user);
```

- Parameter passed to specific path
  For example, in below case, the parameter passed to 'my-posts.destroy' is going to be 'my_post', which is $post.
```
DELETE my-posts/{my_post}... my-posts.destroy › MyPostController@destroy
```

-- Like this. *below is json encoded.
```
{"id":12,"user_id":2,"message":"not make sense.","created_at":"2024-01-19T23:18:56.000000Z","updated_at":"2024-01-19T23:18:56.000000Z"}
```

- How to use `useForm` Inertia form-helper.
  https://inertiajs.com/forms#form-helper


- Commands make some fake data
  Exa: below is for User
```
kosuke@Kousuke:~/f-answer/blog$ sail php artisan tinker
> use App\Models\User;
> $users = User::factory()->count(3)->create();

```
-- There is a way to make data belonging to parent model too.
https://laravel.com/docs/10.x/eloquent-factories#belongs-to-relationships
```
use App\Models\Post;
use App\Models\User;
$posts = Post::factory()
            ->count(3)
            ->for(User::factory()->state([
                'name' => 'Jessica Archer',
            ]))
            ->create();
```

- Get comment by Eloquent (has many)
```
- in model
public function comments(): HasMany
{
    return $this->hasMany(Comment::class);
}
- in controller
$comments = Post::find($post->id)->comments;
```

- Get some posts based on specific category.
  -- Ref URL: https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-multiple-relationships
```
    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
//        $categoryWithPosts = $category->load('posts'); // Maybe don't need though leave it in the just case.
        $categorizedPosts = Post::with(['category', 'user'])
            ->where('category_id', '=', $category->id)
            ->get();
        return Inertia::render('Categories/Show', [
            'posts' => $categorizedPosts
        ]);
    }
```

- How to create a comment with the ID of a user who has not posted.
```
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            // Get all user IDs except the post's author
            $otherUserIds = User::where('id', '<>', $post->user_id)->pluck('id');
            Comment::factory()
                ->count(3)
                ->create([
                    'post_id' => $post->id,
                    // Select a random user ID from the list
                    'user_id' => $otherUserIds->random(),
                ]);
        });
    }
```


- How implement like button

```
sail php artisan make:migration create_likes_table

-- migration file.
Schema::create('likes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});

-- user.php: Added this function.
public function likedPosts(): BelongsToMany
{
    return $this->belongsToMany(Post::class, 'likes');
}

-- post.php: Added this function.
public function likes(): BelongsToMany
{
    return $this->belongsToMany(User::class, 'likes');
}

-- Added these function to LikeController.
public function likePost($postId) {
    $user = auth()->user();
    $user->likedPosts()->attach($postId);
    return response()->json(['message' => 'Liked']);
}

public function unlikePost($postId) {
    $user = auth()->user();
    $user->likedPosts()->detach($postId);
    return response()->json(['message' => 'Unliked']);
}

```

- Tailwind UI Ref
  https://tailwindui.com/components/marketing/sections/blog-sections

- Previewing image Ref
  https://tailwindflex.com/@prajwal/image-input-with-preview

- How to look `nested formdata`
  -- Ref URL:
  https://laravel.com/docs/10.x/validation#a-note-on-nested-attributes


- How to implement a function to detect breakpoint
  https://dev.to/chilupa/usebreakpoint-react-hook-13oa

- Factory reference
  Post::factory()->for($user)->has(Comment::factory()->count(5))->count(1)->create();

- How to count `liked` number for my posts.
    - First suggestion from ChatGPT.
```text
$weekTotalLikes = DB::table('posts')
    ->join('likes', 'posts.id', '=', 'likes.post_id')
    ->where('posts.user_id', $userId)
    ->count();
```
    - Better way by using function.
```text
// in post.php (model)
public function recentLikes()
{
    return $this->hasMany(Like::class, 'post_id')
        ->where('created_at', '>', now()->subWeek());
}
// in controller.
$weekTotalLikes = $myPosts->sum(function ($post) {
    return $post->recentLikes->count();
});
```




### others

https://laraveldaily.com/post/laravel-belongstomany-seed-data-factories

https://laracasts.com/discuss/channels/laravel/factory-with-existing-relationships


- Inertia & React CRUD ref
  https://medium.com/@demian.kostelny/laravel-inertia-js-react-simple-crud-example-2e0d167365d


- How to check time sync is correct or not on wsl Ubuntu
```
timedatectl status
*** If not sync, do below command***
sudo hwclock -s
```






