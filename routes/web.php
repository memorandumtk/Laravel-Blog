<?php


use App\Http\Controllers\PostController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;

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


// Post Resource.
Route::resource('posts', PostController::class)
    ->only(['index', 'destroy', 'show'])
//    ->only(['index', 'edit', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);


// My Post Resource.
Route::resource('my-posts', MyPostController::class)
    ->only(['index', 'edit', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Route for compose.
Route::get('/compose', function () {
    return Inertia::render('Compose/Index');
})->middleware(['auth', 'verified'])->name('compose');

// Route for Category resource.
Route::resource('categories', CategoryController::class)
    ->only(['index', 'show'])
    ->middleware(['auth', 'verified']);

// Route for writing comment.
Route::post('/posts/{post}/comments/', [CommentController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('comment');
// Comment Resource.
//Route::resource('comment', CommentController::class)
//    ->only(['store'])
//    ->middleware(['auth', 'verified']);

Route::any('/test', function (Request $request) {
    return Inertia::render('Test/Index', ['post' => json_encode($request)]);
})->middleware(['auth', 'verified'])->name('test');


require __DIR__ . '/auth.php';
