<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'fingerprint',
    ];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function getTotalAttribute()
    {
        return $this->items->sum('price');
    }

    public function addItem($product, $quantity = 1)
    {
        $item = $this->items()->where('product_id', $product->id)->first();

        if ($item) {
            $item->increment('quantity', $quantity);
        } else {
            $this->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }
    }
    
    public function removeItem($product)
    {
        $item = $this->items()->where('product_id', $product->id)->first();

        if ($item) {
            if ($item->quantity > 1) {
                $item->decrement('quantity');
            } else {
                $item->delete();
            }
        }
    }
}
