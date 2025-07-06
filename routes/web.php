<?php

use App\Http\Resources\OrderResource;
use App\Models\Order;
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

Route::get("/checkout", function () {
    return Inertia::render("Checkouts/Index");
});

Route::get("/checkout/history", function () {
    return Inertia::render("Checkouts/History");
});

Route::get('/checkout/{order}', function (Order $order) {
    $order->load('items.product');

    return Inertia::render('Checkouts/Info', [
        'order' => $order,
    ]);
});