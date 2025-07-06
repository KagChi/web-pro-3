<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'status',
        'total_amount',
        'name',
        'email',
        'phone',
        'address',
        'city',
        'postal_code',
        'fingerprint',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    
    public function getTotalAttribute()
    {
        return $this->items->sum('price');
    }
}
