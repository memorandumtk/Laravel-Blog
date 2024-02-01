<?php


use App\Http\Controllers\ImageController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes for likes request.
Route::post('/posts/{post}/like', [LikeController::class, 'likePost']);
Route::post('/posts/{post}/unlike', [LikeController::class, 'unlikePost']);

// Post Resource.
Route::resource('posts', PostController::class)
    ->only(['index', 'create', 'show', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Image Resource.
Route::resource('image', ImageController::class)
    ->only(['index', 'create', 'show', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// My Post Resource.
Route::resource('my-posts', MyPostController::class)
    ->only(['index', 'edit', 'show', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Route for Category resource.
Route::resource('categories', CategoryController::class)
    ->only(['index', 'show', 'store'])
    ->middleware(['auth', 'verified']);

// Route for writing comment.
Route::controller(CommentController::class)->name('comments')->group(function () {
//    Route::get('/posts/{post}/comments/', 'index')->name('.index');
    Route::post('/posts/{post}/comments/', 'store')->name('.store');
})->middleware(['auth', 'verified']);
//Route::post('/posts/{post}/comments/', [CommentController::class, 'store'])
//    ->middleware(['auth', 'verified'])
//    ->name('comment');

Route::any('/test', function (Request $request) {
    $post = Post::find(1)
        ->with('user','image','comments','category', 'likes')
        ->where('id',1)->get();
    return Inertia::render('Test/Index_org', [
        'post' => $post
    ]);
})->middleware(['auth', 'verified'])->name('test');


require __DIR__ . '/auth.php';
