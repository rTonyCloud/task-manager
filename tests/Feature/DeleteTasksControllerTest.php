<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('deletes a task successfully', function () {
    // Create a user and authenticate
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a task for the authenticated user
    $task = Task::factory()->create([
        'user_id' => $user->id,
    ]);

    // Send a DELETE request to the route handling task deletion
    $response = $this->deleteJson("/tasks/{$task->id}");

    // Assert that the response status is 204 No Content
    $response->assertStatus(204);

    // Assert that the task no longer exists in the database
    $this->assertDatabaseMissing('tasks', [
        'id' => $task->id,
    ]);
});

