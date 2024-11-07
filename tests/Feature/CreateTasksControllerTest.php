<?php

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;

uses(RefreshDatabase::class);

it('creates a task successfully', function () {
    // Create a user to authenticate
    $user = User::factory()->create();
    Auth::login($user);

    // Define the task data
    $taskData = [
        'title' => 'Sample Task',
        'description' => 'This is a sample task description.',
        'status' => 'pending',
        'deadline' => now()->addDays(5)->toDateString(),
    ];

    // Send a POST request to the route handling task creation
    $response = $this->postJson('/tasks', $taskData);

    // Assert that the response status is 201 Created
    $response->assertStatus(201);

    // Assert that the response JSON matches the task data
    $response->assertJson([
        'title' => $taskData['title'],
        'description' => $taskData['description'],
        'status' => $taskData['status'],
        'deadline' => $taskData['deadline'],
    ]);

    // Assert that the task was created in the database
    $this->assertDatabaseHas('tasks', [
        'title' => $taskData['title'],
        'description' => $taskData['description'],
        'status' => $taskData['status'],
        'deadline' => $taskData['deadline'],
        'user_id' => $user->id,
    ]);
});
