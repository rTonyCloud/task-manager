<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use hasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'deadline',
        'user_id'
    ];

    /**
     * get the tasks based on user ownership
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
