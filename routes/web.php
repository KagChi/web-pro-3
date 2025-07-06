<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get("/", function () {
    $products = Product::inRandomOrder()->take(12)->get();
    
    return Inertia::render("Home", [
        'products' => $products
    ]);
});

Route::get("/products", function () {
    $products = Product::latest()->paginate(12);
    
    return Inertia::render("Products/Index", [
        'products' => $products
    ]);
});
