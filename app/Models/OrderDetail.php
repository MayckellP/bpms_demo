<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    public function myOrder()
    {
        return $this->belongsTo(Order::class);
    }

    protected $fillable =[
        'order_id',
        'confirmed',
        'driver',
        'sent_to',
        'sent_to',
        'foto_1',
        'foto_2',
        'receiver',
    ];
}
