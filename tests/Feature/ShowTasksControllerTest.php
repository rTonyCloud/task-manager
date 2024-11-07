<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('shows a task for the authenticated user', function () {
    // Create a user and authenticate
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a task for the authenticated user
    $task = Task::factory()->create([
        'user_id' => $user->id,
    ]);

    // Send a GET request to the show route
    $response = $this->getJson("/tasks/{$task->id}");

    // Assert that the response status is 200 OK
    $response->assertStatus(Response::HTTP_OK);

    // Assert that the response JSON matches the task data
    $response->assertJsonFragment([
        'id' => $task->id,
        'title' => $task->title,
        'description' => $task->description,
        'status' => $task->status,
        'deadline' => $task->deadline->format('Y-m-d H:i:s'),
        'user_id' => $user->id,
    ]);
});

it('returns 404 if the task is not found for the authenticated user', function () {
    // Create a user and authenticate
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a task for a different user
    $otherUser = User::factory()->create();
    $task = Task::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    // Send a GET request to the show route with the task ID of a task not owned by the user
    $response = $this->getJson("/tasks/{$task->id}");

    // Assert that the response status is 404 Not Found
    $response->assertStatus(Response::HTTP_NOT_FOUND);

    // Assert that the response contains the correct error message
    $response->assertJson([
        'message' => 'Task not found',
    ]);
});
