<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Task\ListTasksController;
use App\Http\Controllers\Task\ShowTasksController;
use App\Http\Controllers\Task\CreateTasksController;
use App\Http\Controllers\Task\UpdateTasksController;
use App\Http\Controllers\Task\DeleteTasksController;
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
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Task Routes
Route::middleware('auth')->group(function () {
    Route::get('/tasks', [ListTasksController::class, 'listAllTask'])->name('tasks.list');
    Route::get('/tasks/{task}', [ShowTasksController::class, 'showTask'])->name('tasks.show');
    Route::post('/tasks', [CreateTasksController::class, 'createTask'])->name('tasks.create');
    Route::put('/tasks/{task}', [UpdateTasksController::class, 'updateTask'])->name('tasks.update');
    Route::delete('/tasks/{task}', [DeleteTasksController::class, 'deleteTask'])->name('tasks.delete');
});

// Authentication Routes
require __DIR__ . '/auth.php';
