<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CartStoreController;
use App\Http\Controllers\LogisticController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\CartStore;
use App\Models\OrderDetail;



Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/initialPage', function () {
    $user_id = Auth::id();
    $myCart = CartStore::where('user_id', $user_id)->get(); 
    return Inertia::render('InitialPage', compact('myCart'));
})->middleware(['auth', 'verified'])->name('initialPage');

Route::get('/dashboard', function () {
    $user_id = Auth::id();
    $myCart = CartStore::where('user_id', $user_id)->get(); 
    return Inertia::render('Dashboard', compact('myCart'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile', [ProfileController::class, 'addImage'])->name('profile.addImage');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* --------------------------CLIENT */
Route::resource('client', ClientController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

/* --------------------------LOGISTIC */
Route::resource('logistic', LogisticController::class)->only('index', 'create', 'store', 'show', 'edit', 'update', 'destroy')->middleware(['auth']);

/* --------------------------WAREHOUSE */
Route::resource('warehouse', StockController::class)->only('index', 'create', 'store', 'show', 'edit', 'update', 'destroy')->middleware(['auth']);


/* --------------------------STORE */
Route::resource('store', CartStoreController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

/* --------------------------UPDATE THE CART */
Route::get('cartUpdate', function () {
    $userId = Auth::id(); 
    $myCart = CartStore::where('user_id', $userId)->get();
return Inertia::render('CartUpdate', compact('myCart'));})->middleware(['auth'])->name('cartUpdate');

/* --------------------------ORDER */
Route::resource('orders', OrderController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

/* --------------------------SUPPORT */
Route::resource('support', SupportController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);



require __DIR__.'/auth.php';
