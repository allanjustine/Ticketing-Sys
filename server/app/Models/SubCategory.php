<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $guarded = [];

    public function ticketCategory()
    {
        return $this->belongsTo(TicketCategory::class, 'ticket_category_id', 'ticket_category_id');
    }

    public function ticketDetails()
    {
        return $this->hasMany(TicketDetail::class, 'sub_category_id', 'id');
    }
}
