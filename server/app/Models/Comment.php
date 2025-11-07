<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Comment extends Model
{
    protected $guarded = [];

    protected $appends = [
        'is_edited'
    ];

    public function user()
    {
        return $this->belongsTo(UserLogin::class, 'user_id', 'login_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function getIsEditedAttribute()
    {
        return Carbon::parse($this->updated_at)->gt(Carbon::parse($this->created_at));
    }
}
