<?php


use App\Http\Controllers\PostController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


Route::resource('posts', PostController::class)
    ->only(['index', 'destroy'])
//    ->only(['index', 'edit', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);


Route::resource('my-posts', MyPostController::class)
    ->only(['index', 'edit', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('/compose', function () {
    return Inertia::render('Compose/Index');
})->middleware(['auth', 'verified'])->name('compose');



Route::any('/test', function (Request $request) {
    return Inertia::render('Test/Index', ['post' => json_encode($request)]);
})->middleware(['auth', 'verified'])->name('test');


require __DIR__ . '/auth.php';
