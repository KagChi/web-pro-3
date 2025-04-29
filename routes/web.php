<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get("/", function () {
    $products = Product::latest()->take(3)->get();
    
    return Inertia::render("Home", [
        'products' => $products
    ]);
});
