<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('lists tasks for the authenticated user', function () {

    // Create a user and authenticate
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create tasks for the authenticated user
    $tasksForUser = Task::factory()->count(3)->create([
        'user_id' => $user->id,
    ]);

    // Create tasks for a different user
    $otherUser = User::factory()->create();
    Task::factory()->count(2)->create([
        'user_id' => $otherUser->id,
    ]);

    // Send a GET request to the route handling task listing
    $response = $this->getJson('/tasks');

    // Assert that the response status is 200 OK
    $response->assertStatus(200);

    // Assert that the response contains only the tasks for the authenticated user
    $response->assertJsonCount(3); // Assert there are only 3 tasks

    // Loop through each task and assert specific attributes
    foreach ($tasksForUser as $task) {
        $response->assertJsonFragment([
            'id' => $task->id,
            'title' => $task->title,
            'description' => $task->description,
            'status' => $task->status,
            'deadline' => $task->deadline->format('Y-m-d H:i:s'),
            'user_id' => $user->id,
        ]);
    }
});
