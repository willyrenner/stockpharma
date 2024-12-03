<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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
})->name('dashboard');

Route::get('/loggedin', function () {
    return Inertia::render('Loggedin');
})->name('loggedin');

Route::get('/cadastrarremedios', function () {
    return Inertia::render('Screens/CadastrarRemedios');
})->name('cadastrarremedios');

Route::get('/relatorioPedidos', function () {
    return Inertia::render('Screens/relatorioPedidos');
})->name('relatorioPedidos');

Route::get('/remediosEstoque', function () {
    return Inertia::render('Screens/remediosEstoque');
})->name('remediosEstoque');

Route::get('/removerRemedio', function () {
    return Inertia::render('Screens/removerRemedio');
})->name('removerRemedio');

Route::get('/tarjaAmarela', function () {
    return Inertia::render('Screens/TarjaAmarela');
})->name('tarjaAmarela');

Route::get('/tarjaVermelha', function () {
    return Inertia::render('Screens/TarjaVermelha');
})->name('tarjaVermelha');

Route::get('/tarjaPreta', function () {
    return Inertia::render('Screens/TarjaPreta');
})->name('tarjaPreta');






Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
