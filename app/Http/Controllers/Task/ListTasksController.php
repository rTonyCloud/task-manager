<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class ListTasksController extends Controller
{
    public function listAllTask()
    {
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks);
    }
}
