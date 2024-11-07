<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('updates a task successfully for the authenticated user', function () {
    // Create a user and authenticate them
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a task for this user
    $task = Task::factory()->create([
        'user_id' => $user->id,
        'title' => 'Original Title',
        'description' => 'Original Description',
        'status' => 'pending',
        'deadline' => now()->addDays(5),
    ]);

    // Define the updated task data
    $updatedData = [
        'title' => 'Updated Title',
        'description' => 'Updated Description',
        'status' => 'in_progress',
        'deadline' => now()->addDays(10)->toDateString(),
    ];

    // Send a PATCH request to the update route
    $response = $this->putJson("/tasks/{$task->id}", $updatedData);

    // Assert that the response status is 200 OK
    $response->assertStatus(Response::HTTP_OK);

    // Assert that the response JSON matches the updated data
    $response->assertJsonFragment($updatedData);

    // Assert that the task was updated in the database
    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'title' => $updatedData['title'],
        'description' => $updatedData['description'],
        'status' => $updatedData['status'],
        'deadline' => $updatedData['deadline'],
        'user_id' => $user->id,
    ]);
});

it('returns 403 when a user tries to update a task they do not own', function () {
    // Create two users
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    // Authenticate the first user
    $this->actingAs($user);

    // Create a task for the other user
    $task = Task::factory()->create([
        'user_id' => $otherUser->id,
        'title' => 'Original Title',
    ]);

    // Define the updated task data
    $updatedData = [
        'title' => 'Unauthorized Update Attempt',
    ];

    // Attempt to update the other user's task
    $response = $this->putJson("/tasks/{$task->id}", $updatedData);

    // Assert that the response status is 403 Forbidden
    $response->assertStatus(Response::HTTP_FORBIDDEN);
});
