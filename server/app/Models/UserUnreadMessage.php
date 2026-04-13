<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserUnreadMessage extends Model
{
    protected $guarded = [];

    protected $appends = [
        'message_count'
    ];

    public function user()
    {
        return $this->belongsTo(UserLogin::class);
    }

    public function getMessageCountAttribute()
    {
        return $this->total;
    }
}
